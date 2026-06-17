/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  size: string;
  priceTsh: number;
  priceUsd: number;
  descriptionEng: string;
  descriptionSwa: string;
  image: string;
  tagEng: string;
  tagSwa: string;
  tagType: 'primary' | 'tertiary';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  phone: string;
  location: string;
  deliveryTime: string;
  specialInstructions?: string;
  senderName?: string;
}

export interface FAQItem {
  questionEng: string;
  questionSwa: string;
  answerEng: string;
  answerSwa: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  textEng: string;
  textSwa: string;
  rating: number;
  avatar: string;
}

export type Language = 'en' | 'sw';
