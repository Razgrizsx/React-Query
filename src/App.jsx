import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const Posts = [
  {id: 1, title: 'Post 1'},
  {id: 2, title: 'Post 2'}
]

function App() {

 const queryClient = useQueryClient() 
  
 const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () =>  wait(1000).then(() => [...Posts])  //Promise.reject("Error")
  })

  const postMutation = useMutation({
    mutationFn: (title) => {
     return wait(1000).then(() => Posts.push({id: crypto.randomUUID(), title})
     )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    }
  })
  
  if(postQuery.isLoading) return <h1>Loading...</h1>
  if(postQuery.error) return <h1>{JSON.stringify(postQuery.error)}</h1>
  
  
  return (

    <div>
      {postQuery.data.map((post) => <div key={post.title}>{post.title}</div>)}
      <button disabled={postMutation.isLoading} onClick={() => postMutation.mutate("Post 3")}>Add New</button>  
    </div>
  )
}

function wait(duration){
  return new Promise(r => setTimeout(r, duration))
}

export default App
