// document.querySelector("#minpackage").addEventListener("input",(e)=>{
//   document.querySelector("#minpackageLabel").innerHTML=e.target.value+"Lakhs";
//   });
  document.querySelector("#maxFees").addEventListener("input",(e)=>{
    document.querySelector("#maxFeesLabel").innerHTML=e.target.value+"Lakhs";
    });
  
   const results=document.getElementById('results');
   console.log(results);
  
  let colleges;

  

  const getData=async ()=>{
    console.log("Makinf a request from server..");
    const formData={};

      const inputs=document.querySelectorAll("input");
      console.log(inputs);
      inputs.forEach((input)=>{
      formData[input.id]=input.value;
      });
      console.log(formData);

    const response=await fetch("https://find-college-accio.herokuapp.com/findcolleges",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formData),
    });
   // console.log(response);
    colleges=await response.json();
    console.log(colleges);

    results.innerHTML="";
    colleges.forEach((college,i)=>{
      results.innerHTML+=`<li class="list-group-item list-group-item-action" data-index=${i}>${college.name}</li>`;
    });
    document.querySelector("#results").addEventListener("click",(e)=>{
     // console.log("user clicked",e.target.innerHTML);
     const li=e.target;
     const collegeIndex=li.dataset.index;
     console.log(collegeIndex);
     const college=colleges[collegeIndex];
     document.querySelector(".card-title").innerHTML=college.name;
     const list=document.querySelector(".list-group-flush");
     list.innerHTML="";
     Object.keys(college).forEach((key)=>{
       list.innerHTML+=`<li class="list-group-item"><strong>${key}</strong>:${college[key]}</li>`;
     })
    })
    };
  
    document.querySelector("form").addEventListener("input",getData);