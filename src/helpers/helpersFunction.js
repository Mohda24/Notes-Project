const getDate=(date)=>{
    const extractDate=new Date(date)
    const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month=shortMonths[extractDate.getMonth()];
    const day=extractDate.getDate();
    const time=`${extractDate.getHours()}:${String(extractDate.getMinutes()).length==1?`0${extractDate.getMinutes()}`:extractDate.getMinutes()}`

    
    return `${month} ${day},${time}`
}

export {getDate}