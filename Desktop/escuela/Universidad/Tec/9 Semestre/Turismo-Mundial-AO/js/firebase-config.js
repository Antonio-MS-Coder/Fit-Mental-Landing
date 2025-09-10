// Firebase Configuration for Turismo Mundial AO
// This is a demo configuration - replace with your actual Firebase project config

const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "turismo-mundial-ao.firebaseapp.com",
  projectId: "turismo-mundial-ao",
  storageBucket: "turismo-mundial-ao.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Firebase App State
let firebaseApp = null;
let auth = null;
let db = null;
let currentUser = null;

// Mock Firebase functions for development
const mockFirebase = {
  initializeApp: (config) => {
    console.log('[Firebase Mock] Initializing app with config:', config);
    return { name: 'mock-app' };
  },
  
  getAuth: (app) => {
    console.log('[Firebase Mock] Getting auth service');
    return {
      currentUser: null,
      signInWithEmailAndPassword: async (email, password) => {
        console.log('[Firebase Mock] Sign in attempt:', email);
        return { user: { uid: 'mock-user-id', email } };
      },
      createUserWithEmailAndPassword: async (email, password) => {
        console.log('[Firebase Mock] Create user attempt:', email);
        return { user: { uid: 'mock-user-id', email } };
      },
      signOut: async () => {
        console.log('[Firebase Mock] Sign out');
        currentUser = null;
      },
      onAuthStateChanged: (callback) => {
        console.log('[Firebase Mock] Auth state change listener added');
        // Simulate initial auth state
        setTimeout(() => callback(null), 100);
        return () => {}; // unsubscribe function
      }
    };
  },
  
  getFirestore: (app) => {
    console.log('[Firebase Mock] Getting Firestore service');
    return {
      collection: (name) => ({
        doc: (id) => ({
          get: async () => ({
            exists: () => true,
            data: () => ({ id, collection: name, mockData: true })
          }),
          set: async (data) => {
            console.log(`[Firebase Mock] Setting document ${id} in ${name}:`, data);
          },
          update: async (data) => {
            console.log(`[Firebase Mock] Updating document ${id} in ${name}:`, data);
          }
        }),
        add: async (data) => {
          console.log(`[Firebase Mock] Adding document to ${name}:`, data);
          return { id: 'mock-doc-id' };
        },
        where: (field, operator, value) => ({
          get: async () => ({
            docs: [
              {
                id: 'mock-doc-1',
                data: () => ({ [field]: value, mockData: true })
              }
            ]
          })
        }),
        orderBy: (field, direction = 'asc') => ({
          limit: (count) => ({
            get: async () => ({
              docs: Array.from({ length: Math.min(count, 5) }, (_, i) => ({
                id: `mock-doc-${i + 1}`,
                data: () => ({ 
                  id: `mock-doc-${i + 1}`,
                  [field]: `value-${i + 1}`,
                  mockData: true 
                })
              }))
            })
          })
        })
      })
    };
  }
};

// Initialize Firebase (using mock for development)
function initializeFirebase() {
  try {
    // For production, you would import the actual Firebase SDK
    // For now, we'll use the mock
    firebaseApp = mockFirebase.initializeApp(firebaseConfig);
    auth = mockFirebase.getAuth(firebaseApp);
    db = mockFirebase.getFirestore(firebaseApp);
    
    // Set up auth state listener
    auth.onAuthStateChanged((user) => {
      currentUser = user;
      updateUIForAuthState(user);
    });
    
    console.log('[Firebase] Initialized successfully');
    return true;
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
    return false;
  }
}

// Update UI based on authentication state
function updateUIForAuthState(user) {
  const authButtons = document.querySelectorAll('.nav-login, .nav-signup');
  const userButtons = document.querySelectorAll('.user-menu');
  
  if (user) {
    // User is signed in
    authButtons.forEach(btn => {
      if (btn.classList.contains('nav-login')) {
        btn.textContent = 'Mi Perfil';
        btn.href = '/dashboard';
      } else if (btn.classList.contains('nav-signup')) {
        btn.textContent = 'Cerrar Sesión';
        btn.onclick = () => signOut();
      }
    });
  } else {
    // User is signed out
    authButtons.forEach(btn => {
      if (btn.classList.contains('nav-login')) {
        btn.textContent = 'Iniciar Sesión';
        btn.href = '/login';
        btn.onclick = null;
      } else if (btn.classList.contains('nav-signup')) {
        btn.textContent = 'Registrarse';
        btn.href = '/registro';
        btn.onclick = null;
      }
    });
  }
}

// Authentication functions
async function signInUser(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('[Auth] User signed in:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('[Auth] Sign in error:', error);
    throw error;
  }
}

async function createUser(email, password) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log('[Auth] User created:', userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error('[Auth] Create user error:', error);
    throw error;
  }
}

async function signOut() {
  try {
    await auth.signOut();
    console.log('[Auth] User signed out');
    window.location.reload();
  } catch (error) {
    console.error('[Auth] Sign out error:', error);
  }
}

// Check if user is logged in
function isUserLoggedIn() {
  return currentUser !== null;
}

// Get current user
function getCurrentUser() {
  return currentUser;
}

// Firestore helper functions
async function getDocument(collection, docId) {
  try {
    const docRef = db.collection(collection).doc(docId);
    const doc = await docRef.get();
    
    if (doc.exists()) {
      return doc.data();
    } else {
      console.log(`[Firestore] No document found: ${collection}/${docId}`);
      return null;
    }
  } catch (error) {
    console.error('[Firestore] Get document error:', error);
    throw error;
  }
}

async function setDocument(collection, docId, data) {
  try {
    await db.collection(collection).doc(docId).set(data);
    console.log(`[Firestore] Document set: ${collection}/${docId}`);
  } catch (error) {
    console.error('[Firestore] Set document error:', error);
    throw error;
  }
}

async function updateDocument(collection, docId, data) {
  try {
    await db.collection(collection).doc(docId).update(data);
    console.log(`[Firestore] Document updated: ${collection}/${docId}`);
  } catch (error) {
    console.error('[Firestore] Update document error:', error);
    throw error;
  }
}

async function addDocument(collection, data) {
  try {
    const docRef = await db.collection(collection).add(data);
    console.log(`[Firestore] Document added: ${collection}/${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Add document error:', error);
    throw error;
  }
}

async function queryDocuments(collection, whereField, operator, value, limit = 10) {
  try {
    const querySnapshot = await db.collection(collection)
      .where(whereField, operator, value)
      .limit(limit)
      .get();
    
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    
    return docs;
  } catch (error) {
    console.error('[Firestore] Query documents error:', error);
    throw error;
  }
}

// Export functions for global use
window.firebase = {
  initializeFirebase,
  signInUser,
  createUser,
  signOut,
  isUserLoggedIn,
  getCurrentUser,
  getDocument,
  setDocument,
  updateDocument,
  addDocument,
  queryDocuments,
  updateUIForAuthState
};

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', () => {
  initializeFirebase();
});