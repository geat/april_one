import "dotenv/config";
import { db } from "../src/db";
import { category, product, user, account } from "../src/db/schema";
import { nanoid } from "nanoid";
import { sql } from "drizzle-orm";
import { auth } from "../src/lib/auth/server";

async function seed() {
  console.log("🌱 Seeding database...");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✓ Loaded" : "✗ Missing");

  try {
    // Check if data already exists
    const existingCategories = await db.select().from(category).limit(1);
    if (existingCategories.length > 0) {
      console.log("⚠️  Database already seeded, skipping...");
      return;
    }

    // First, clean up any existing users with broken password hashes
    console.log("Cleaning up any existing users...");
    await db.delete(user);
    await db.delete(account);
    console.log("✓ Cleaned up existing users");

    // Create admin user using Better Auth API
    console.log("Creating admin user...");

    const adminUser = await auth.api.signUpEmail({
      body: {
        email: "admin@example.com",
        password: "admin123",
        name: "admin",
        username: "admin",
        gender: "other"
      }
    });

    if (!adminUser.user) {
      throw new Error("Failed to create admin user");
    }

    // Update the user role to admin (can't be set during signup due to input: false)
    await db
      .update(user)
      .set({ role: "admin" })
      .where(sql`${user.id} = ${adminUser.user.id}`);

    console.log(`✓ Created admin user (email: admin@example.com, password: admin123, role: admin)`);

    // Create categories
    console.log("Creating categories...");
    const categories = await db
      .insert(category)
      .values([
        {
          id: nanoid(),
          name: "Electronics",
          description: "Electronic devices and gadgets",
          imageUrl: "/categories/electronics.jpg",
        },
        {
          id: nanoid(),
          name: "Clothing",
          description: "Fashion and apparel",
          imageUrl: "/categories/clothing.jpg",
        },
        {
          id: nanoid(),
          name: "Books",
          description: "Books and literature",
          imageUrl: "/categories/books.jpg",
        },
        {
          id: nanoid(),
          name: "Home & Garden",
          description: "Home improvement and gardening",
          imageUrl: "/categories/home.jpg",
        },
        {
          id: nanoid(),
          name: "Sports",
          description: "Sports and outdoor equipment",
          imageUrl: "/categories/sports.jpg",
        },
      ])
      .returning();

    console.log(`✓ Created ${categories.length} categories`);

    // Create products
    console.log("Creating products...");
    const products = [
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: "149.99",
        categoryId: categories.find((c) => c.name === "Electronics")!.id,
        stock: 50,
        imageUrls: ["/products/headphones1.jpg", "/products/headphones2.jpg"],
      },
      {
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart rate monitor",
        price: "299.99",
        categoryId: categories.find((c) => c.name === "Electronics")!.id,
        stock: 30,
        imageUrls: ["/products/smartwatch1.jpg"],
      },
      {
        name: "USB-C Cable",
        description: "Fast charging USB-C cable, 2 meters",
        price: "19.99",
        categoryId: categories.find((c) => c.name === "Electronics")!.id,
        stock: 100,
        imageUrls: ["/products/cable.jpg"],
      },
      {
        name: "Men's T-Shirt",
        description: "100% cotton comfortable t-shirt",
        price: "29.99",
        categoryId: categories.find((c) => c.name === "Clothing")!.id,
        stock: 75,
        imageUrls: ["/products/tshirt1.jpg", "/products/tshirt2.jpg"],
      },
      {
        name: "Women's Jeans",
        description: "Classic fit denim jeans",
        price: "79.99",
        categoryId: categories.find((c) => c.name === "Clothing")!.id,
        stock: 45,
        imageUrls: ["/products/jeans.jpg"],
      },
      {
        name: "Running Shoes",
        description: "Comfortable running shoes with excellent cushioning",
        price: "119.99",
        categoryId: categories.find((c) => c.name === "Sports")!.id,
        stock: 40,
        imageUrls: ["/products/shoes1.jpg", "/products/shoes2.jpg"],
      },
      {
        name: "Yoga Mat",
        description: "Non-slip yoga mat with carrying strap",
        price: "39.99",
        categoryId: categories.find((c) => c.name === "Sports")!.id,
        stock: 60,
        imageUrls: ["/products/yogamat.jpg"],
      },
      {
        name: "The Great Gatsby",
        description: "Classic novel by F. Scott Fitzgerald",
        price: "14.99",
        categoryId: categories.find((c) => c.name === "Books")!.id,
        stock: 80,
        imageUrls: ["/products/gatsby.jpg"],
      },
      {
        name: "Programming Book",
        description: "Learn modern web development",
        price: "49.99",
        categoryId: categories.find((c) => c.name === "Books")!.id,
        stock: 35,
        imageUrls: ["/products/programming.jpg"],
      },
      {
        name: "Plant Pot Set",
        description: "Set of 3 ceramic plant pots",
        price: "34.99",
        categoryId: categories.find((c) => c.name === "Home & Garden")!.id,
        stock: 55,
        imageUrls: ["/products/pots.jpg"],
      },
      {
        name: "LED Desk Lamp",
        description: "Adjustable LED desk lamp with USB port",
        price: "44.99",
        categoryId: categories.find((c) => c.name === "Home & Garden")!.id,
        stock: 42,
        imageUrls: ["/products/lamp.jpg"],
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable waterproof Bluetooth speaker",
        price: "89.99",
        categoryId: categories.find((c) => c.name === "Electronics")!.id,
        stock: 38,
        imageUrls: ["/products/speaker.jpg"],
      },
    ];

    const createdProducts = await db
      .insert(product)
      .values(
        products.map((p) => ({
          id: nanoid(),
          ...p,
          isActive: true,
        }))
      )
      .returning();

    console.log(`✓ Created ${createdProducts.length} products`);

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed:", error);
    process.exit(1);
  });