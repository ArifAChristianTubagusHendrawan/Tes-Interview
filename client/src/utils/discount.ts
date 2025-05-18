/**
 * Calculate discount based on the following rules:
 * - If total > 1,000,000, apply 10% discount
 * - If isMember is true, add 5% discount
 * - If promoCode is "DISKON20", add 20% discount
 * - Maximum total discount is 50%
 *
 * @param total The total amount before discount
 * @param isMember Whether the customer is a member
 * @param promoCode Optional promo code
 * @returns The final amount after applying discounts
 */
export function calculateDiscount(total: number, isMember = false, promoCode?: string): number {
  let discountPercentage = 0

  // Apply discount for total > 1,000,000
  if (total > 1000000) {
    discountPercentage += 10
  }

  // Apply member discount
  if (isMember) {
    discountPercentage += 5
  }

  // Apply promo code discount
  if (promoCode === "DISKON20") {
    discountPercentage += 20
  }

  // Cap the maximum discount at 50%
  discountPercentage = Math.min(discountPercentage, 50)

  // Calculate the final amount
  const discountAmount = (total * discountPercentage) / 100
  const finalAmount = total - discountAmount

  return finalAmount
}
