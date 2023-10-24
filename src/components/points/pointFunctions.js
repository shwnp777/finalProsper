import {
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase-config";

export const sendPoints = async (senderId, receiverId, amount, pointNote) => {
  try {
    // Deduct points from sender.
    const senderRef = doc(db, "users", senderId);
    await updateDoc(senderRef, {
      balance: increment(-amount), // Decrement by passing a negative value to increment.
    });

    // Add points to receiver.
    const receiverRef = doc(db, "users", receiverId);
    await updateDoc(receiverRef, {
      balance: increment(amount),
    });

    // Log the transaction in points collection.
    await addDoc(collection(db, "points"), {
      sender: senderId,
      receiver: receiverId,
      amount: amount,
      note: pointNote,
      timestamp: serverTimestamp(), // Server-side timestamp.
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Done!");
  }
};

export const displayTransactions = async (userId) => {
  const q = query(collection(db, "points"), where("sender", "==", userId));

  const querySnapshot = await getDocs(q);
  let totalAmount = 0;

  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    totalAmount += doc.data().amount;
  });

  console.log("Total Amount: ", totalAmount);
  return {
    transactions: querySnapshot.docs.map((doc) => doc.data()),
    totalAmount,
  };
};
