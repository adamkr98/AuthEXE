  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import supabase from "./supabase";

  const Profile = () => {

    const navigate = useNavigate();

    const [ inputName, setInputName ] = useState('');
    const [  fetchedName, setFetchedName ] = useState('');
    const [ currentUser, setCurrentUser ] = useState({});
    // const [ loading, setLoading ] = useState(true);

    const handleNameChange = (e) => {
      setInputName(e.target.value);
    }

    // console.log(currentUser.id);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          setCurrentUser(user);
    

          const { data, error } = await supabase
            .from('users')
            .select('user_name')
            .eq('user_UID', user.id)
            .single();
    
          if (error) {
            console.error("Error fetching user data:", error.message);
          } else {
            setFetchedName(data.user_name);
          }
        } catch (error) {
          console.error("Error getting current user:", error.message);
        } finally {
          // setLoading(false);
        }
      };
    
      fetchUserData();
    }, []);
    
    

    const insertUserData = async (e) => {
      e.preventDefault();
      try {  
        const { data, error } = await supabase
        .from('users')
        .upsert({ 
          user_UID: currentUser.id,
          user_name: inputName 
        })
        .select()
    
        if (error) {
          console.error("Error inserting data:", error.message);
        } else {
          console.log("Data updated successfully!");
        }
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
    }

    const updateUserData = async (e) => {
      e.preventDefault();
      try {
        const { data, error } = await supabase
    
        .from('users')
        .update({ user_name: inputName })
        .eq('user_UID', currentUser.id)
    
        if (error) {
          console.error("Error inserting data:", error.message);
        } else {
          console.log("Data updated successfully!");
        }
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
    }

    const logoutUser = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Error logging out:", error.message);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    }

    return (
      <>
        {/* {!loading && ( */}
      
      <div className="w-full h-[100vh] flex justify-center items-center">

        <div className="w-3/4 h-[70vh]flex flex-col border border-red-400">

            <div className="w-full">
              <p className="w-fit h-[20vh]">Hello {fetchedName}</p>
            </div>

            <form onSubmit={updateUserData} className="w-1/4 h-[10vh] border border-red-400 flex flex-col">
              <input onChange={handleNameChange} type="text" placeholder="name" />
              <button type="submit">Update</button>
            </form>

            <div className="w-full mt-10">
              <button onClick={logoutUser}>LogOut</button>
            </div>
        </div>
      </div>
        {/* )} */}
      </>
      
    )
  }

  export default Profile;