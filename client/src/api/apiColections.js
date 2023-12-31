// export const getAllPost=()=>{
//     fetch('/getall', {
//         method: 'POST'
//       }).then(
//         response => response.json()
//       ).then(
//         data => {
//           return data.posts;
//         }
//       )
// }
// export const sendPost = async (event,content)=>{
//     event.preventDefault();
//     try {
//         const response = await fetch('/new', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ content })
//         });
//         const data = await response.json();
//         return data.posts
//       }
//       catch (error) {
//         // console.error('Error:', error);
//       }
// }
// export const deletePost = async (event, id) =>{
//     event.preventDefault();
//     try {
//         console.log("DELETE"+id)
//         const response = await fetch('/delete', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({id})
//         });
//         const data = await response.json();
//         return data.posts
//       }
//       catch (error) {
  
//       }
// }
// export const addComment = async (event, id, comment) =>{
//   event.preventDefault();
//   try {
//       console.log("COMENT"+id)
//       const response = await fetch('/addcomment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({id,comment})
//       });
//       const data = await response.json();
//       return data.posts
//     }
//     catch (error) {

//     }
// }
export const editStudentInfo = async(event,studentinfo)=>{
  event.preventDefault();
  try{
    const respone = await fetch('/editstudent',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({studentinfo})
    })
    const data = await respone.json()
    return data.message
  }
  catch(error){
    return "Something went wrong"
  }
}
export const get1StudentByID = async(event, id)=>{
  event.preventDefault();
  try{
    const respone = await fetch('/getstudent',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
    const data = await respone.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const setStudentSession = async(id)=>{
  // event.preventDefault();
  try{
    const respone = await fetch('/setstudentsession',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    })
    const data = await respone.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getStudentSession = async()=>{
  // event.preventDefault();
  try{
    const respone = await fetch('/getstudentsession',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify()
    })
    const data = await respone.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const setInstructorSession = async(email)=>{
  try{
    const respone = await fetch('/setinstructorsession',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email})
    })
    const data = await respone.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getInstructorSession = async()=>{
  try{
    const respone = await fetch('/getinstructorsession',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
    })
    const data = await respone.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const signOut = async()=>{
  try{
    const response = await fetch('/signout',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
    })
    const data = await response.json()
    return data.status
  }
  catch(error){
    return false
  }
}
export const getCategories = async()=>{
  try{
    const response = await fetch('/getcategories',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const addThesis = async(studentlist, name, category, description)=>{
  try{
    const response = await fetch('/addthesis',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({studentlist,name,category,description})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
//this get all theses associated with instructor and store it in server session
export const getThesisByInstructorID = async(instructorid)=>{
  try{
    const response = await fetch('/getthesisbyinstructorid',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({instructorid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const setThesisSession = async(id)=>{
  try{
    const response = await fetch('/setthesissession',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({id})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getThesisSession = async()=>{
  try{
    const response = await fetch('/getthesissession',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getStudentsInThesis = async(thesisID)=>{
  try{
    const response = await fetch('/getstudentsinthesis',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisID})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getTasksInThesis = async(thesisID)=>{
  try{
    const response = await fetch('/gettasksinthesis',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisID})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const addTask = async(thesisID,tasks)=>{
  try{
    const response = await fetch('/addtasks',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisID,tasks})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
//get the thesis associated with student ID and set it into the server session
export const getStudentThesis = async(id)=>{
  try{
    const response = await fetch('/studentthesis',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({id})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const submit = async(taskid, submission)=>{
  try{
    const response = await fetch('/submit',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({taskid, submission})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const confirmSubmission = async(taskid)=>{
  try{
    const response = await fetch('/confirmsubmission',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({taskid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const addScore = async(thesisid,score)=>{
  try{
    const response = await fetch('/score',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid,score})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getAllRelatedToScore = async(thesisid)=>{
  try{
    const response = await fetch('/getscore',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const editInstructorProfile = async(phone,address)=>{
  try{
    const response = await fetch('/instructorinfo',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({phone,address})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const suspendThesis = async(thesisid)=>{
  try{
    const response = await fetch('/suspend',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const proposeThesis = async (thesisname,category,description)=>{
  try{
    const response = await fetch('/propose',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisname,category,description})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getAllPendingThesis = async ()=>{
  try{
    const response = await fetch('/getpts',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getInstructorOfPendingThesis = async (thesisid)=>{
  try{
    const response = await fetch('/instructorpt',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const joinThesis = async (thesisid)=>{
  try{
    const response = await fetch('/jointhesis',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const cancleRequest = async (thesisid)=>{
  try{
    const response = await fetch('/cancelrequest',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getInstructorPendingTheses = async()=>{
  try{
    const response = await fetch('/getpendingtheses',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getStudentsInPendingThesis = async(thesisid)=>{
  try{
    const response = await fetch('/studentipt',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const confirmRequest = async (students,thesis)=>{
  try{
    const response = await fetch('/confirmrequest',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesis,students})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const removePropose = async (thesis)=>{
  try{
    const response = await fetch('/removepropose',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesis})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getAllInstructor = async ()=>{
  try{
    const response = await fetch('/getinstructors',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const setDefendDate = async (instructorid,thesisid,date)=>{
  try{
    const response = await fetch('/defend',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({instructorid,thesisid,date})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getDefenseDate = async (thesisid)=>{
  try{
    const response = await fetch('/getdefend',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({thesisid})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}
export const getInstructorDefense = async ()=>{
  try{
    const response = await fetch('/getinstructordefense',{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({})
    })
    const data = await response.json()
    return data
  }
  catch(error){
    return "Something went wrong"
  }
}