"use client"

import { useState } from "react";

export default function parse(parseString:string){  
    const [scriptsAll,setAllScripts] = useState<HTMLScriptElement[]>() ;
    const parser = new DOMParser(); 
    const doc = parser.parseFromString(parseString, 'text/html'); 
    const scripts = doc.querySelectorAll("script") ; 
    
    Array.from(scripts).map((scr:any) => setAllScripts(scr) ) ; 
    return scriptsAll
}

