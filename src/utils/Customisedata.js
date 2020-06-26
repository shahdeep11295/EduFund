export const customiseGraphdata = (item, name) => {
    if (name === "yaxis") {
        let data = [];
        for (var i = 0; i <= 10; i++) {
            data.push(parseFloat(item[i].nav));
        }
        console.log("customiseGraphdata3", data);
        return data
    } else if (name === "xaxis") {
        let data = [];
        for (var i = 0; i <= 10; i++) {
            const Object = {};
            var dateString1 = item[i].date;
            var dateParts = dateString1.split("-");
            var dateObject1 = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
            var month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";
            Object = dateObject1.getDate() + " " + month[dateObject1.getMonth()] + ", " + dateObject1.getUTCFullYear()
            data.push(Object);
        }
        console.log("customiseGraphdata2", data);
        return data
    }
}