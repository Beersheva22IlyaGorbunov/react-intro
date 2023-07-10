import { Observable, catchError, of } from 'rxjs'
import Employee from '../../model/Employee'
import EmployeesService from './EmployeesService'
import firebaseApp from '../../config/firebase-config'
import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  getFirestore,
  collection,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  FirestoreError
} from 'firebase/firestore'
import { collectionData } from 'rxfire/firestore'
import { getRandomInt } from '../../utils/random'
import { getISODateStr } from '../../utils/date-functions'

const MIN_ID = 100000
const MAX_ID = 1000000

function convertEmployee (empl: Employee, id?: string): any {
  const res = {
    ...empl,
    id: empl.id ? empl.id : id,
    birthDate: getISODateStr(empl.birthDate)
  }
  return res
}

export default class EmployeesServiceFirebase implements EmployeesService {
  private readonly collectionRef: CollectionReference = collection(
    getFirestore(firebaseApp),
    'employees'
  )

  async addEmployee (employee: Employee): Promise<Employee> {
    const newId = await this.getNewId()
    const docRef = this.getDocRef(newId)
    const convertedEmployee = convertEmployee(employee, newId)
    try {
      await setDoc(docRef, convertedEmployee)
    } catch (err: any) {
      const firestoreError: FirestoreError = err
      const errorMessage = this.getErrorMsg(firestoreError)
      throw errorMessage
    }
    return convertedEmployee
  }

  async deleteEmployee (employeeId: any): Promise<void> {
    try {
      const isExists = await this.exists(employeeId)
      if (!isExists) {
        throw 'Not found'
      }

      const docRef = this.getDocRef(employeeId)
      await deleteDoc(docRef)
    } catch (err: any) {
      const firestoreError: FirestoreError = err
      const errorMessage = this.getErrorMsg(firestoreError)
      throw errorMessage
    }
  }

  async updateEmployee (updatedEmployee: Employee): Promise<Employee> {
    try {
      const isExists = await this.exists(updatedEmployee.id)
      if (!isExists) {
        throw 'Not found'
      }

      const docRef = this.getDocRef(updatedEmployee.id)
      const convertedEmployee = convertEmployee(updatedEmployee)
      await setDoc(docRef, convertedEmployee)
    } catch (err: any) {
      const firestoreError: FirestoreError = err
      const errorMessage = this.getErrorMsg(firestoreError)
      throw errorMessage
    }
    return updatedEmployee
  }

  getEmployees (): Observable<string | Employee[]> {
    return collectionData(this.collectionRef).pipe(
      catchError((err) => {
        const firestoreError: FirestoreError = err
        const errorMessage = this.getErrorMsg(firestoreError)
        return of(errorMessage)
      })
    ) as Observable<string | Employee[]>
  }

  private async exists (id: string): Promise<boolean> {
    console.log(id)
    const docRef: DocumentReference = this.getDocRef(id)
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef)
    return docSnap.exists()
  }

  private async getNewId (): Promise<string> {
    let id: string
    do {
      id = getRandomInt(MIN_ID, MAX_ID).toString()
    } while (await this.exists(id))
    return id
  }

  private getDocRef (id: string): DocumentReference {
    return doc(this.collectionRef, id)
  }

  private getErrorMsg (error: FirestoreError): string {
    let errMsg = error.message
    switch (error.code) {
      case 'unauthenticated':
      case 'permission-denied': {
        errMsg = 'Authentication'
        break
      }
      case 'not-found': {
        errMsg = 'Not found'
        break
      }
    }
    return errMsg
  }
}
