export const formatPrice = (price: number | undefined | null) => {
    if (!price) return null
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(price)
}