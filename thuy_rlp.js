function removeHtmlTag(n,e)
	{
	if(-1!=n.indexOf("<"))
		{
		for(var t=n.split("<"),i=0;
		i<t.length;
		i++)-1!=t[i].indexOf(">")&&(t[i]=t[i].substring(t[i].indexOf(">")+1,t[i].length));
		n=t.join("")
	}
	for(e=e<n.length-1?e:n.length-2;
	" "!=n.charAt(e-1)&&-1!=n.indexOf(" ",e);
	)e++;
	return n=n.substring(0,e-1),n+"..."
}
function createSnippet(n)
	{
	var e=document.getElementById(n),t=snippet_count,i='<div class="snippets">'+removeHtmlTag(e.innerHTML,t)+"</div>";
	e.innerHTML=i
}
function createSummaryAndThumb(e,t)
	{
	var n=220;
	var r=180;
	image_tag='<img width="'+n+'" height="'+r+'" src="'+e.replace("/s72-c/","/w"+n+"-h"+r+"-c/")+'" alt="'+t.replace(/"/g,"")+'" title="'+t.replace(/"/g,"")+'"/>';
	if(t!="")return image_tag;
	else return""
}
);
