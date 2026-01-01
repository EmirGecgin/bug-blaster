export const sortTicket = (tickets, preference)=>{
    switch(preference){
        case "Hight to Low":
            return [...tickets].sort((a,b)=>b.priority.localeCompare(a.priority));
        case "Low to Hight":
            return [...tickets].sort((a,b)=>a.priority.localeCompare(b.priority));
        default:
            return tickets;
    }
}