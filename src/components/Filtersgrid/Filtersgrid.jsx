import './index.css'


const Filtersgrid = (props) =>{

    const {Employeetype ,updateType,SalaryRanges,updateSalary}=props 

    const handleCheckboxChange = (event) =>{
    updateType({value: event.target.value, checked: event.target.checked })
    }
    const onchangesalary = (event) =>{
updateSalary({value: event.target.value, checked: event.target.checked })
    }


 
return (  <div className='filter-container'>
      <h1 className='type-heading'>Type of Employment</h1>
      {Employeetype.map((eachitem) => {
        
     return(
        <div key={eachitem.emplyeeid} >
          <label className='type-item'>
           <input
  type="checkbox"
  value={eachitem.emplyeeid} 
  onChange={handleCheckboxChange}
/>
            {eachitem.displaytext}
          </label>
        </div>)
})}

<hr className='horizantal-line'/>

  <h1 className='type-heading'>Salary Ranges</h1>
      {SalaryRanges.map((eachitem) => {
        
     return(
        <div key={eachitem.salaryid} >
          <label className='type-item'>
           <input
  type="checkbox"
  value={eachitem.salaryid} 
  onChange={onchangesalary}
/>
            {eachitem.displaytext}
          </label>
        </div>)
})}
    </div>



)



}
export default Filtersgrid