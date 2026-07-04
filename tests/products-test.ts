type Product = {
    name: string;
    price: number;
    inStock: boolean;
};

const product1: Product = {
    name: "Jacket",
    price: 45.89,
    inStock: true,
}

const product2: Product = {
    name: "Shoes",
    price: 100,
    inStock: false,
}

function formatPrice(price:number): string {
    return '$${price}';
}
console.log(formatPrice(product1.price));