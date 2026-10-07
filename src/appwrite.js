// const DatabaseId = import.meta.env.VITE_APPWRITE_DATABASE_KEY;
// const CollectionId = import.meta.env.VITE_APPWRITE_COLLECTION_KEY;
// const ProjectId = import.meta.env.VITE_APPWRITE_PROJECT_KEY;
// import {Client, Databases, ID, Query} from 'appwrite';

// const client = new Client()
// .setEndpoint('https://cloud.appwrite.io/v1')
// .setProject(ProjectId)

// const database = new Databases(client)
// const updateSearchCount = async (searchTerm, movie)=>{
//    try{
//        const results = await database.listDocuments(DatabaseId, CollectionId, [
//         Query.equal('searchTerm', searchTerm)
//        ],)

//        if(results.documents.length > 0){
//         const doc = results.documents[0]
//         await database.updateDocument(DatabaseId, CollectionId, doc.$id, {
//             count: doc.count+1,
//         })
//        } else {
//         await database.createDocument(DatabaseId, CollectionId, ID.unique(), {
//             searchTerm,
//             count: 1,
//             movie_id: movie.id,
//             poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
//         })
//        }

//    } catch(error) {
//       console.error(error)
//    }
// }
 
// const getTrendingMovies = async () => {
//     try{
//        const results =  await database.listDocuments(DatabaseId,CollectionId, [
//             Query.limit(5),
//             Query.orderDesc('count')
//         ])

//         return results.documents;
//     } catch(error){
//         console.error(error)
//     }
// }

// export {updateSearchCount, getTrendingMovies};