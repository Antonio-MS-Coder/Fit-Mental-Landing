import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { sampleEmployers, sampleJobs } from '../src/utils/sampleData'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seedEmployers() {
  console.log('Seeding employers...')
  
  for (const employer of sampleEmployers) {
    try {
      const docRef = await addDoc(collection(db, 'employers'), {
        ...employer,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      console.log(`Created employer: ${employer.name} with ID: ${docRef.id}`)
    } catch (error) {
      console.error(`Error creating employer ${employer.name}:`, error)
    }
  }
}

async function seedJobs() {
  console.log('Seeding jobs...')
  
  for (const job of sampleJobs) {
    try {
      const docRef = await addDoc(collection(db, 'jobs'), {
        ...job,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      console.log(`Created job: ${job.title} with ID: ${docRef.id}`)
    } catch (error) {
      console.error(`Error creating job ${job.title}:`, error)
    }
  }
}

async function main() {
  try {
    console.log('Starting data seeding...')
    
    await seedEmployers()
    await seedJobs()
    
    console.log('Data seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error during data seeding:', error)
    process.exit(1)
  }
}

main()