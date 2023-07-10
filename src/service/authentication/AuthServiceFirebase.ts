import LoginData from '../../model/LoginData'
import UserData from '../../model/UserData'
import AuthService from './AuthService'
import firebaseApp from '../../config/firebase-config'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

export default class AuthServiceFirebase implements AuthService {
  private readonly auth = getAuth(firebaseApp)
  private readonly administratorsCollection = collection(
    getFirestore(firebaseApp),
    'administrators'
  )

  async login (loginData: LoginData): Promise<UserData> {
    let userData: UserData = null
    try {
      const userCredentials =
        loginData.email === 'GOOGLE'
          ? await signInWithPopup(this.auth, new GoogleAuthProvider())
          : await signInWithEmailAndPassword(
            this.auth,
            loginData.email,
            loginData.password
          )
      userData = {
        email: loginData.email,
        role: (await this.isAdmin(userCredentials.user.uid))
          ? 'admin'
          : 'user'
      }
    } catch (e) {
      throw new Error('Wrong credentials')
    }
    return userData
  }

  private async isAdmin (uid: any): Promise<boolean> {
    const docRef = doc(this.administratorsCollection, uid)
    return (await getDoc(docRef)).exists()
  }

  async logout (): Promise<void> {
    return await signOut(this.auth)
  }
}
