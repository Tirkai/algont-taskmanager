const taskDeadlineCheck = (deadline: any) => {
    const deadlineDate: any = new Date(deadline);
    const bufferDeadlineDate = new Date(deadlineDate.getTime());
    const currentDate : any = new Date();
    const warningDate: any = new Date(bufferDeadlineDate.setDate(bufferDeadlineDate.getDate() - 3));
    
    console.log(warningDate);
    const result = {
        warning: currentDate >= warningDate,
        overdue: deadlineDate <= new Date()
    }
    console.log(result);
    return result;
}
export { taskDeadlineCheck };