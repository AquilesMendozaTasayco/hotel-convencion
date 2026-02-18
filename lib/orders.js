import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function createOrder(orderData) {
  try {
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const order = {
      orderId: orderId,
      customer: orderData.customer,
      items: orderData.items,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      total: orderData.total,
      paymentStatus: "pending",
      orderStatus: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "orders"), order);
    
    return {
      id: docRef.id,
      orderId: orderId
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// NUEVA FUNCIÓN: Para serializar documentos de Firebase para Client Components
export function serializeFirebaseDoc(doc) {
  const data = doc.data();
  
  // Convertir Timestamps a strings ISO
  const serialized = { ...data, id: doc.id };
  
  Object.keys(serialized).forEach(key => {
    if (serialized[key] instanceof Timestamp) {
      serialized[key] = serialized[key].toDate().toISOString();
    }
    // También manejar Timestamps anidados
    if (serialized[key] && typeof serialized[key] === 'object') {
      Object.keys(serialized[key]).forEach(nestedKey => {
        if (serialized[key][nestedKey] instanceof Timestamp) {
          serialized[key][nestedKey] = serialized[key][nestedKey].toDate().toISOString();
        }
      });
    }
  });
  
  return serialized;
}

// NUEVA FUNCIÓN: Para serializar arrays de documentos
export function serializeFirebaseDocs(docs) {
  return docs.map(doc => serializeFirebaseDoc(doc));
}