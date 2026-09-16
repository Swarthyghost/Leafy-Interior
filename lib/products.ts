"use server";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Product, ProductCategory } from "@/types";

const PRODUCTS = "products";

// Firestore rejects `undefined` field values outright, but optional form
// fields (e.g. salePrice when a product isn't on sale) naturally end up
// undefined — strip them so writes don't fail for the common case.
function stripUndefined<T extends object>(data: T): T {
  return Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)) as T;
}

export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, PRODUCTS));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(collection(db, PRODUCTS), where("featured", "==", true));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const q = query(collection(db, PRODUCTS), where("category", "==", category));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, PRODUCTS), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Product;
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, PRODUCTS, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function createProduct(data: Omit<Product, "id">): Promise<string> {
  const ref = await addDoc(collection(db, PRODUCTS), stripUndefined(data));
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, PRODUCTS, id), stripUndefined(data));
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS, id));
}
