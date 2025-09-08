import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  increment,
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Job, Employer, JobApplication } from '@/types'

// Generic Firebase service class
export class FirebaseService {
  static async getDocument<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T
      }
      
      return null
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error)
      return null
    }
  }

  static async getCollection<T>(
    collectionName: string, 
    queryConstraints: any[] = []
  ): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName)
      const q = queryConstraints.length > 0 ? query(collectionRef, ...queryConstraints) : collectionRef
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
    } catch (error) {
      console.error(`Error getting collection ${collectionName}:`, error)
      return []
    }
  }

  static async addDocument<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      return docRef.id
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error)
      return null
    }
  }

  static async updateDocument<T>(
    collectionName: string, 
    id: string, 
    data: Partial<T>
  ): Promise<boolean> {
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      })
      return true
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error)
      return false
    }
  }

  static async deleteDocument(collectionName: string, id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, collectionName, id))
      return true
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error)
      return false
    }
  }
}

// Job service
export class JobService extends FirebaseService {
  private static collection = 'jobs'

  static async getJob(id: string): Promise<Job | null> {
    const job = await this.getDocument<Job>(this.collection, id)
    if (job) {
      // Increment view count
      await this.incrementViews(id)
    }
    return job
  }

  static async getJobs(filters: {
    category?: string
    location?: string
    type?: string
    limit?: number
  } = {}): Promise<Job[]> {
    const constraints = []
    
    if (filters.category) {
      constraints.push(where('category', '==', filters.category))
    }
    if (filters.location) {
      constraints.push(where('location', '==', filters.location))
    }
    if (filters.type) {
      constraints.push(where('type', '==', filters.type))
    }
    
    constraints.push(orderBy('createdAt', 'desc'))
    
    if (filters.limit) {
      constraints.push(limit(filters.limit))
    }

    return this.getCollection<Job>(this.collection, constraints)
  }

  static async getFeaturedJobs(limitCount = 6): Promise<Job[]> {
    const constraints = [
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    ]

    return this.getCollection<Job>(this.collection, constraints)
  }

  static async getJobsByEmployer(employerId: string): Promise<Job[]> {
    const constraints = [
      where('employerId', '==', employerId),
      orderBy('createdAt', 'desc')
    ]

    return this.getCollection<Job>(this.collection, constraints)
  }

  static async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    return this.addDocument<Job>(this.collection, jobData)
  }

  static async updateJob(id: string, jobData: Partial<Job>): Promise<boolean> {
    return this.updateDocument<Job>(this.collection, id, jobData)
  }

  static async deleteJob(id: string): Promise<boolean> {
    return this.deleteDocument(this.collection, id)
  }

  private static async incrementViews(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collection, id)
      await updateDoc(docRef, {
        views: increment(1)
      })
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }
}

// Employer service
export class EmployerService extends FirebaseService {
  private static collection = 'employers'

  static async getEmployer(id: string): Promise<Employer | null> {
    return this.getDocument<Employer>(this.collection, id)
  }

  static async getEmployers(filters: {
    industry?: string
    location?: string
    limit?: number
  } = {}): Promise<Employer[]> {
    const constraints = []
    
    if (filters.industry) {
      constraints.push(where('industry', '==', filters.industry))
    }
    if (filters.location) {
      constraints.push(where('location', '==', filters.location))
    }
    
    constraints.push(orderBy('createdAt', 'desc'))
    
    if (filters.limit) {
      constraints.push(limit(filters.limit))
    }

    return this.getCollection<Employer>(this.collection, constraints)
  }

  static async getFeaturedEmployers(limitCount = 8): Promise<Employer[]> {
    const constraints = [
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    ]

    return this.getCollection<Employer>(this.collection, constraints)
  }

  static async createEmployer(employerData: Omit<Employer, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    return this.addDocument<Employer>(this.collection, employerData)
  }

  static async updateEmployer(id: string, employerData: Partial<Employer>): Promise<boolean> {
    return this.updateDocument<Employer>(this.collection, id, employerData)
  }
}

// Job application service
export class ApplicationService extends FirebaseService {
  private static collection = 'applications'

  static async getApplication(id: string): Promise<JobApplication | null> {
    return this.getDocument<JobApplication>(this.collection, id)
  }

  static async getUserApplications(userId: string): Promise<JobApplication[]> {
    const constraints = [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    ]

    return this.getCollection<JobApplication>(this.collection, constraints)
  }

  static async getJobApplications(jobId: string): Promise<JobApplication[]> {
    const constraints = [
      where('jobId', '==', jobId),
      orderBy('createdAt', 'desc')
    ]

    return this.getCollection<JobApplication>(this.collection, constraints)
  }

  static async createApplication(applicationData: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    return this.addDocument<JobApplication>(this.collection, applicationData)
  }

  static async updateApplicationStatus(
    id: string, 
    status: JobApplication['status']
  ): Promise<boolean> {
    return this.updateDocument<JobApplication>(this.collection, id, { status })
  }

  static async hasUserApplied(userId: string, jobId: string): Promise<boolean> {
    const constraints = [
      where('userId', '==', userId),
      where('jobId', '==', jobId),
      limit(1)
    ]

    const applications = await this.getCollection<JobApplication>(this.collection, constraints)
    return applications.length > 0
  }
}