import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export function useFetchDocuments(docCollection, search = null, uid = null) {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadData() {
            if (cancelled)
                return;

            setLoading(true);

            const collectionRef = await collection(db, docCollection);

            try {
                let sql;

                if (search) {
                    sql = await query(
                        collectionRef,
                        where("tags", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                }
                else if (uid) {
                    sql = await query(
                        collectionRef,
                        where("uid", "==", uid),
                        orderBy("createdAt", "desc")
                    );
                }
                else {
                    sql = await query(collectionRef, orderBy("createdAt", "desc"));
                }


                await onSnapshot(sql, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) =>
                            ({ id: doc.id, ...doc.data() })
                        ));
                });
            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            setLoading(false);
        }

        loadData();
    }, [docCollection, search, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    });

    return { documents, loading, error };
}
