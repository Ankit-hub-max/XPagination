import React,{useState,useEffect} from 'react';
import './Table.css'

function App() {
  const [users,setUsers]=useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const usersPerPage=10;

  useEffect(()=>{
    const fetchUsers=async ()=>{
      try{
        const response=await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        const data= await response.json();
        setUsers(data)
      }catch(error){
        console.error("Failed to fetch users:",error);
        alert("Failed to fetch users")
      }
    }
    fetchUsers();
  },[])

  const totalPages=Math.ceil(users.length/usersPerPage);
  const startIndex=(currentPage-1)*usersPerPage;
  const currentUsers=users.slice(startIndex,startIndex+usersPerPage);

  const handlePrevious=()=>{
    if(currentPage>1) 
      setCurrentPage(currentPage-1);
  };

  const handleNext=()=>{
    if(currentPage<totalPages)
      setCurrentPage(currentPage+1)
  };

  return (
    <>
    <div className='Table-container'>
      <h2>Employee Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user=>(
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
  <button onClick={handlePrevious} disabled={currentPage===1}>Previous</button>
  <button disabled>{currentPage}</button>
  <button onClick={handleNext} disabled={currentPage===totalPages}>Next</button>
</div>

    </div>
      
    </>
  )
}

export default App
