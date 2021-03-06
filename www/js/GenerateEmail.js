function Email(title,date,images,captions,notes, notesTitle, followuptitle, followupexperience,evaluationtitle, evaluation,type,background,font,template, outcomes, colour, principles, practices) {

    this.title = title;
    this.date = date;
    this.images = images;

    this.captions = captions;

    this.notes = notes;
    this.fnotes = "";
    this.notesTitle = notesTitle;

    this.followtitle = followuptitle;
    this.evaluationtitle = evaluationtitle;

    this.follow = followupexperience;
    this.evaluation = evaluation;

    this.background = background;
    if(this.background == "A") { this.background = "#90EE90" }
    if(this.background == "B") { this.background = "#778899" }
    if(this.background == "C") { this.background = "#008080" }
    if(this.background == "D") { this.background = "#ADD8E6" }
    if(this.background == "E") { this.background = "#FFFFFF" }

    this.font = font;
    if(this.font == "A") { this.font = "cursive" }
    if(this.font == "B") { this.font = "fantasy" }
    if(this.font == "C") { this.font = "helvetica" }
    if(this.font == "D") { this.font = "palatino" }

    this.fontcolour = colour;
    if(this.fontcolour == "A") { this.fontcolour = "#000000" }
    if(this.fontcolour == "B") { this.fontcolour = "#FFFFFF" }
    if(this.fontcolour == "C") { this.fontcolour = "#00008B" }

    this.template = template;

    this.outcomes = outcomes;
    this.foutcomes = [];

    //Format Notes
    for(var i=0; i<notes.length;i++) {
        this.fnotes+= '<p style="margin-left:1em;">' + notes[i] + '</p>';
    }

    //Format practices & principles
    this.practices = [];
    this.principles = [];
    this.blurb = null;

    for(var i=0; i<principles.length;i++) {
        this.principles+= '<li style="margin-left:1em;">' + principles[i] + '</li>';
    }

    for(var i=0; i<practices.length;i++) {
        this.practices+= '<li style="margin-left:1em;">' + practices[i] + '</li>';
    }

    if(this.practices.length > 0 || this.principles.length > 0) {
        this.blurb = "Educators have carefully considered the following pedagogical principles and practices to promote learning and assist the child to make progress in relation to the Learning Outcomes.";
    }

    //Format Outcomes
    this.fstrings = [];
    this.fstring = "";

    for(var outcome in outcomes) {

        var fstring = '<p><b>' + outcomes[outcome].Title + '</b></p>';

        for(var x in outcomes[outcome]) {

            if(x != "Title") {

                if(outcomes[outcome][x].Descriptor) {
                    fstring+= ' <i> ' + outcomes[outcome][x].Descriptor + '</i></br></br>';
                    fstring+= '' + 'The child:';
                }
                else {
                    fstring+= '' + 'The child:';
                }

                fstring+= ' <ul style="font-size:12px; padding:0px 0px 0px 25px"> ';

                for(var i=0;i<outcomes[outcome][x].Selections.length; i++) {
                    if(i == outcomes[outcome][x].Selections.length-1) {
                        fstring+= ' <li>' + outcomes[outcome][x].Selections[i] + '</li> ';
                    }
                    else {
                        fstring+= ' <li>' + outcomes[outcome][x].Selections[i] + '</li> ';
                    }
                }

                fstring+= '</ul>';
            }
        }
        this.fstrings.push(fstring);
    }

    for(var i=0; i<this.fstrings.length;i++) {
        this.fstring+='<div style="margin-left:1em; font-size:12px;margin-bottom:5px;">' + this.fstrings[i] + '</div>';
    }


    //EC etc etc
    this.type = type;

    this.EmailString = "";
}

Email.prototype.IframeForm = function(emailbody) {

    var iframe = document.createElement("iframe");
    $(iframe).html('<form action="https://sendgrid.com/api/mail.send.json" method="post" enctype="multipart/form-data">'+
        '<input type="text" name="to" value="iancalligeros@gmail.com">'+
        '<input type="text" name="toname" value="test">'+
        '<input type="text" name="subject" value="Childs Learning Story">'+
        '<input type="text" name="from" value="test@yourdomain.com">'+
        '<input type="text" name="api_user" value="iancalligeros">'+
        '<input type="text" name="api_key" value="tenaciousd">'+
        '<input type="text" name="html" value=' + emailbody + '>'+
        '<input type="file" name="files[a.jpg]" src="@a.jpg">'+
        '<input name="content[a.jpg]" value="a.jpg">'+
        '<input name="files[b.jpg]" value="@a.jpg">'+
        '<input type="submit">'+
        '</form>');

    document.body.appendChild(ifrm);

}

Email.prototype.GenerateEmail = function(template) {

    this.EmailString+= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> ' +
        '<html xmlns="http://www.w3.org/1999/html"> ' +
            '<head> ' +
                '<meta charset="utf-8"> ' +
                    '<title>Learning Story</title> ' +
                '</head> ' +
                '<body>' +
                    '<div style="width:600px;font-family:'+ this.font +';color:'+ this.fontcolour +';background-color:'+ this.background +';border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;border: 2px solid #E8EDFF;display:table"> ' +
                        '<!-- Title Banner --> ' +
                        '<div style="width:600px;height:60px;float:left;color:black;text-align:center;">'+

                        '    <div id="floats" class="plzfloat" style="font-size:28px;width:600px;float:left;">'+ this.title +'</div> ' +
                        '    <div id="floats" class="plzfloat" style="width:600px;font-style:italic;float:left;margin-bottom:10px">'+ this.date +'</div> ' +
                        '</div>';

    if(this.captions) {
        this.captions[0]=(this.captions[0])?this.captions[0]:"";
        this.captions[1]=(this.captions[1])?this.captions[1]:"";
        this.captions[2]=(this.captions[2])?this.captions[2]:"";
    }

    if(this.images == 0) {
    }

    if(this.images == 1) {
        this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;height:200px;float:left;margin-bottom:10px;">' +
            '<table width="100%" style="margin-bottom:5px;padding-bottom:5px;">' +
                '<tr valign="top">' +
                    '<td width="100%" height=210 colspan="1" align="center">' +
                    '<img src="cid:' + SendData.uuid + '1.jpg" width="193" height="200" style="border:none;width:none !important; max-width:none !important; max-width:none !important">' +
                    '</td>' +
                '</tr>' +
            '</table>' +
        '</div>';

        this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;height:20px;float:left;margin-bottom:10px;">'+
            '<table width="100%" style="font-style:italic; font-size:10px">' +
                '<tr valign="top">' +
                    '<td width="100%" colspan="1" align="center">'+ this.captions[0] + '</td>' +
                '</tr>' +
            '</table>' +
        '</div>';
    }

    if(this.images == 2) {
        this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;height:200px;float:left;margin-bottom:10px">' +
            '<table width="100%" style="margin-bottom:5px;padding-bottom:5px;">' +
                '<tr valign="top">' +
                    '<td width="50%" height=210 colspan="1" align="center">' +
                        '<img src="cid:' + SendData.uuid + '1.jpg" width="193" height="200" style="border:none;width:none !important; max-width:none !important; max-width:none !important">' +
                    '</td>' +
                    '<td width="50%" height=210 colspan="1" align="center">' +
                        '<img src="cid:' + SendData.uuid + '2.jpg" width="193" height="200" style="border:none;width:none !important; max-width:none !important; max-width:none !important">' +
                    '</td>' +
                '</tr>' +
            '</table>' +
        '</div>';

        this.EmailString+='<div class="plzfloat" id="floats" style="width:600px;height:20px;float:left;margin-bottom:10px;">'+
            '<table width="100%" style="font-style:italic; font-size:10px">' +
                '<tr valign="top">' +
                    '<td width="50%" colspan="1" align="center">'+ this.captions[0] + '</td>' +
                    '<td width="50%" colspan="1" align="center">'+ this.captions[1] + '</td>' +
                '</tr>' +
            '</table>' +
        '</div>';
    }

    if(this.images == 3) {
        this.EmailString+='<div class="plzfloat" id="floats" style="width:600px;height:200px;float:left;margin-bottom:10px">' +
            '<table width="100%" style="margin-bottom:5px;padding-bottom:5px;">' +
                '<tr valign="top">' +
                    '<td width="30%" height=210 colspan="1" align="center">' +
                        '<img src="cid:' + SendData.uuid + '1.jpg" width="193" height="200" style="border:none;width:none !important; max-width:none !important; max-width:none !important">' +
                    '</td>' +
                    '<td width="30%" height=210 colspan="1" align="center">' +
                        '<img src="cid:' + SendData.uuid + '2.jpg" width="193" height="200" style="border:none;width:none !important; max-width:none !important; max-width:none !important">' +
                    '</td>' +
                    '<td width="30%" height=210 colspan="1" align="center">' +
                        '<img src="cid:' + SendData.uuid + '3.jpg" width="193" height="200" style="border:none;width:none !important; max-width:none !important; max-width:none !important">' +
                    '</td>' +
                '</tr>' +
            '</table>' +
        '</div>';

        this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;height:20px;float:left;margin-bottom:10px;">'+
            '<table width="100%" style="font-style:italic; font-size:10px">' +
                '<tr valign="top">' +
                    '<td width="30%" colspan="1" align="center">'+ this.captions[0] + '</td>' +
                    '<td width="30%" colspan="1" align="center">'+ this.captions[1] + '</td>' +
                    '<td width="30%" colspan="1" align="center">'+ this.captions[2] + '</td>' +
                '</tr>' +
            '</table>' +
        '</div>';
    }

    this.EmailString+= '<div id="floats" class="plzfloat" style="width:600px;float:left;margin-bottom:10px">';

    if(template == "A") {

        this.EmailString+='<table width="100%" style="margin-top:10px;"><tr valign="top">';

        var width = 0;
        var num = 0;
        var isNoFstring = false;

        if(this.fnotes != "") {
            num += 1;
        }

        if(this.evaluation != "" || this.follow != "") {
            num += 1;
        }

        if(this.fstring != "") {
            num += 1;
        } else { isNoFstring = true }

        if(num >= 3) { width = 30; }
        if(num == 2) { width = 50; }
        if(num == 1) { width = 100; }
        if(num == 0) { width = 0; }

        //Do for THs
        if(this.fnotes != "") {
            this.EmailString+='<th width="'+ width + '%" colspan="1" align="center">' + this.notesTitle + '</th>'
        }

        if(this.evaluation != "" || this.follow != "") {
            if(this.evaluation != "") { this.EmailString+='<th width="'+ width + '%" colspan="1" align="center">' + this.evaluationtitle +' </th>'; }
            else { this.EmailString+='<th width="'+ width + '%" colspan="1" align="center">' + this.followtitle + '</th>';}
        }

        if(this.fstring != "") {
            this.EmailString+='<th width="'+ width + '%" colspan="1" align="center">Early Years Learning Framework Outcomes</th>'
        }

        //Now do for TDs
        this.EmailString+= '</tr><tr valign="top">';

        if(this.fnotes != "") {
            this.EmailString+='<td width="'+ width + '%" colspan="1" align=""><div style="font-size:12px">'+ this.fnotes +'</div></td>';
        }

        if(this.evaluation != "" || this.follow !="") {
            this.EmailString+='<td width="'+ width + '%" colspan="1" align="">';
            if(this.evaluation != "") {
                this.EmailString +='<p style="font-size:12px">'+ this.evaluation +'</p>';
                if(this.follow != "") {
                    this.EmailString +='<p style="text-align:center;font-weight:bold">' + this.followtitle + '</p><p style="font-size:12px">'+ this.follow +'</p>';
                }
            } else {
                this.EmailString +='<p style="font-size:12px">'+ this.follow +'</p>';
            }
            this.EmailString+='</td>';
        }

        if(this.fstring != "") {
            this.EmailString+='<td width="'+ width + '%" colspan="1" align="">' + this.fstring + '</td>';
        }

        this.EmailString+='</tr></table>';
    }

    else {

        this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;float:left;margin-bottom:10px;"></div>';
        if(this.fnotes != "") {
            this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;float:left;margin-bottom:10px;">'+
                '<p style="text-align:center;font-weight:bold">' + this.notesTitle + '</p>'+
                '<div style="font-size:12px">'+ this.fnotes +'</div></div>';
        }

        if(this.evaluation != "") {
            this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;float:left;margin-bottom:10px;">'+
                '<p style="text-align:center;font-weight:bold">' + this.evaluationtitle + '</p>'+
                '<p style="font-size:12px">'+ this.evaluation +'</p>'+
                '</div>';
        }
        if(this.follow != "") {
            this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;float:left;margin-bottom:10px;">'+
                '<p style="text-align:center;font-weight:bold">' + this.followtitle + '</p>'+
                '<p style="font-size:12px">'+ this.follow +'</p>'
            '</div>';
        }

        if(this.fstring != "") {
            this.EmailString+='<div id="floats" class="plzfloat" style="width:600px;float:left;margin-bottom:10px;">'+
                '<p style="text-align:center;font-weight:bold">Early Years Learning Framework Outcomes</p>'+
                '<div style="font-size:12px">'+ this.fstring +
            '</div>';
        }
    }
    this.EmailString+='</div>';

    if(this.principles.length > 0 || this.practices.length > 0) {

        this.EmailString+= '<!-- Principles & Practices --><div class="plzfloat" id="floats" style="width:600px;float:left;margin-bottom:10px">';

        //Add Blurb
        this.EmailString+='<p style="text-align:left;font-style:italic;margin-bottom:10px">'+this.blurb+'</p>'

        if(template == "A" && this.principles.length > 0 && this.practices.length > 0) {

            //Use Table only if template A and there are principles AND practices
            this.EmailString+='<table width="100%">'+
                '<tr valign="top">'+
                    '<th width="50%" colspan="1" align="center" >Principles</th>'+
                    '<th width="50%" colspan="1" align="center" >Practices</th>'+
                '</tr>'+
                '<tr valign="top">'+
                    '<td width="50%" colspan="1" >'+
                        '<ul style="font-size:12px">'+ this.principles +'</ul>'+
                    '</td>'+
                    '<td width="50%" colspan="1" >'+
                        '<ul style="font-size:12px">'+ this.practices +'</ul>'+
                    '</td>'+
                '</tr>'+
            '</table>';

        }

        else {

            //Add principles if any...
            if(this.principles.length >0) {
                this.EmailString+='<p style="text-align:center;font-weight:bold">Principles:</p>';
                this.EmailString+='<ul style="font-size:12px">'+ this.principles +'</ul>';
            }

            //Add practices if any...
            if(this.practices.length >0) {
                this.EmailString+='<p style="text-align:center;font-weight:bold">Practices:</p>';
                this.EmailString+='<ul style="font-size:12px">'+ this.practices +'</ul>';
            }

        }

        this.EmailString+='</div>';

    }

    this.EmailString+='</div></body></html>';

    return this.EmailString;
}