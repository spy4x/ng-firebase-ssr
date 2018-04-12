import {Action, DocumentChangeAction} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;


export const unwrapCollectionSnapshotChanges = <T>(actions: DocumentChangeAction[]): T[] => actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return {...data, id} as any;
});

export const unwrapDocSnapshotChanges = <T>(action: Action<DocumentSnapshot>): T => {
  const data = action.payload.data();
  const id = action.payload.id;
  return {...data, id} as any;
};
