const {readFileSync, promises:fsPromises} = require('fs');
const fs = require('fs');


const tex = ReadFile('./public/test.txt');
tex.then(value =>{
   let Test = parseText(value);
   module.exports = {Test};
}).catch(err =>{
    console.log(err);
})


async function ReadFile(filename){
    try{
        const contents = await fsPromises.readFile(filename, 'utf-8');
        const arr = contents.split("2019 American Camping Association, Inc. November 2019");///\r?\n/

      // console.log(arr);

        return  arr;

    } catch (err){
        console.log(err);
    }
}


/*var pages = {
    category: "Doses and Memosas",
    standard: "test1",
    appliesto:"true",
   // contextedu: "blah",
   // compliancedem: "this is not it",
   D
    //substandard:[{
       // id: "test1.1",
        //description:"this is not a drill"
   // }
//]
};
*/
function parseText(text){
    let pages=[];
   // let text = JSON.stringify(txt);
   // console.log(text);

    for(i = 1; i < text.length-1; i++){
        
        var page ={};
        lines = text[i].split(/\r?\n/);
        //lines = JSON.stringify(lines);


        var categ= lines[2];
        var standardn = lines[3];
        var standard = standardn.split(' ');
        
        if(standardn.includes(' - ')){//checks if page contains id
            page.id= standard[0];
            s=standardn.split('.');
            page.category = s[0];
            page.standard = standardn;
            page.categoryDescription = categ;
            //console.log(standard);
            var appto = [];
            aindex=0;
            j=5;
            while(lines[j].includes('camps')||lines[j+1].includes('camps')){
                if(!lines[j+1].includes('•')){
                    appto[aindex]= (lines[j]+lines[j+1]).replace('•',"");
                    j++;
                    j++;
                }else{
                    appto[aindex] =  lines[j].replace('•',"");
                    j++;
                }
                
                aindex++;
            }
            page.appliesTo = appto;
           // console.log(page.appliesTo);

            var d=0;
            var Dna = [];
            while(!lines[j].includes(standardn)&& !(String(lines[j])).includes(' - ')){
                if(lines[j].includes('DNA:') && Dna.length == 0){
                    Dna[d] = lines[j]; 
                    
                }else if(lines[j].includes('DNA:')){
                    d++;
                    Dna[d] = lines[j];
                }else if(Dna.length!= 0){
                    Dna[d] = Dna[d] + lines[j];
                }else{

                }
                j++;


            }

            page.DoesNotApply = Dna;
            //console.log(String(lines[j]));
        
            let aggdna='';// dna policies
            while(!lines[j].includes('Contextual Education')){
                if(lines[j].includes('©')){// next page
                    //console.log('reset context');
                    j=0;
                    i++;
                    lines= text[i].split(/\r?\n/);
                }
                aggdna= aggdna+lines[j];
                j++;
            }
            j++;

            
            let dnaarr = aggdna.split(standard[0]).join(' - ').split(' - ');
            //subDescriptions (ie ad.5.1 - Do you like pina coladas?)
            //S console.log(dnaarr);
            var subdes = {};
            for ( k = 1; k<dnaarr.length; k +=2){
                id = standard[0]+dnaarr[k];
                des= dnaarr[k+1];
                subdes[id]=des;
                //console.log(lines[j])
                if(lines[j].includes('©')){ // next page
                    //console.log('reset subdes');
                    j=0;
                    i++;
                    lines= text[i].split(/\r?\n/);


                }



            }
            page.subDescription = subdes;
            //console.log(page.DNA);



            let cont = '';
            while(!lines[j].includes('Compliance Demonstration')){
                if(lines[j].includes('©')){
                    //console.log('reset context');
                    j=0;
                    i++;
                    lines= text[i].split(/\r?\n/);
                }
              //  console.log(j);
               cont= cont+lines[j];
               j++;
            }
            page.ContextualEducation= cont;
            

            let comp = '';
            j++;
            while(j<lines.length) {
              
                comp = comp+lines[j];
                j++;
            }
           // console.log(comp)

            page.ComplianceDemonstration = comp;
           // console.log(page.ComplianceDemonstration);
            
            keys =Object.keys(subdes);
           // console.log(keys);
            //console.log('hernodsinfe')
        /*    if(keys.length > 1){
                for(z=0;z<keys.length;z++){
                    //console.log(keys[z]);
                    let copypage = page;
                    
                    copypage.id= keys[z];
                 //   ses = z+1;
                  //  var nums = String(name+'.'+ses);
                    
                    
                    pages.push(copypage);
                    copypage = null;
                }

            }else{
                pages.push(page);
            }
           // console.log('here');
*/      


            pages.push(page);



            




        }else{}
              
        
    }
        //console.log(pages.includesDNA);
              //  console.log("break");
      //  console.log(lines);
         console.log(pages);
   fs.writeFile('./public/jsontest.json', JSON.stringify(pages), (err) =>{
    if (err){
        throw(err);
    }
    console.log('Saved to jsontest.json');
    });
    return pages;




}