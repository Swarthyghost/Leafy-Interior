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
import type { Category, Product } from "@/types";

const PRODUCTS = "products";
const CATEGORIES = "categories";

export async function getCategories(): Promise<Category[]> {
  const snap = await getDocs(collection(db, CATEGORIES));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Category));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const q = query(collection(db, CATEGORIES), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as Category;
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

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const q = query(collection(db, PRODUCTS), where("categoryId", "==", categoryId));
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

export async function getPotProducts(): Promise<Product[]> {
  const category = await getCategoryBySlug("flower-pots");
  if (!category) return [];
  return getProductsByCategory(category.id);
}

export async function createProduct(data: Omit<Product, "id">): Promise<string> {
  const ref = await addDoc(collection(db, PRODUCTS), data);
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, PRODUCTS, id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCTS, id));
}

export async function createCategory(data: Omit<Category, "id">): Promise<string> {
  const ref = await addDoc(collection(db, CATEGORIES), data);
  return ref.id;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<void> {
  await updateDoc(doc(db, CATEGORIES, id), data);
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, CATEGORIES, id));
}
