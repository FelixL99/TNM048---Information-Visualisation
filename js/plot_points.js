

var colorCodes = ["#ff0000", "ff0080", "ff00ff", "8000ff", "0000ff","0080ff"
                ,"00ffff", "00ff80", "00ff00", "80ff00", "ffbf00", "ff0000"];

function Points() {

    this.plot = function(selection) {
        //plot the points
        selection
            .attr('fill', function (d) {
                if (d.budget === null) {
                    return "#ff0000";
                } else {
                    return "ff0000";
                }
            })
    }

    this.details = function(d) {
        //Show detailed information about certain point when hovering
        var details = d3.select("#details")
        details
            .select("#title")
            .text("Movie Title: " + d.title)

        details
            .select("#releasedate")
            .text("Release Date: " + d.release_date)

        details
            .select("#overview")
            .text("Overview: " + d.overview)

        details
            .select("#runtime")
            .text("Runtime: " + d.runtime)

        if (d.budget == null) {
            details
                .select("#budget")
                .text("Budget: No entry")
        } else {
            details
                .select("#budget")
                .text("Budget: " + d.budget)
        }

        if (d.revenue === null) {
            details
                .select("#revenue")
                .text("Revenue: No entry")
        } else {
            details
                .select("#revenue")
                .text("Revenue: " + d.revenue)
        }
    }

}