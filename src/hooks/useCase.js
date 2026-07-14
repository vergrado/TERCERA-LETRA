export const getCaseById = async (id) => {
    const reference = doc(
        db,
        "casos",
        id
    );
    const snapshot = await getDoc(reference);
    if (!snapshot.exists()) {
        return null;
    }
    return {
        id: snapshot.id,
        ...snapshot.data()
    };
};