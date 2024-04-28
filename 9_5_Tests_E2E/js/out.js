var u = top;
var Out = (()=>{
    let newEl = document.createElement('pre');
    newEl.id = 'out'+Math.floor(111111+Math.random()*999999);
    ($=>[['font-size','15px'],['border','inset 2px'],['background-color','rgba(0,0,0,0.7)'],['color','red'], ['margin','5px auto 5px']].forEach(_=>$.style[_[0]]=_[1]))(newEl);
    window.addEventListener('load',e=>document.body.appendChild(newEl));

    const getAllKeysAndValues = obj => Object.getOwnPropertyNames(obj).map( k => ({[k]: obj[k]}));

    function inner(){
 	   this.el = newEl;	
	   this.style = newEl.style;
       this._print = function (...args){
		  let last = (!args[args.length-1]) ? 1 : 0,
              cr = last ? '' : '\n';
          this.el.textContent += args.slice(0,args.length-last).join('')  + cr; 
          // return undefined, like console.log
       };
       this.print = function (...args){
          if (args[0] === 0) {
            this._print('0');
          } else {
		    this._print(...args); 
          }
		  return this;   // provides method chain
       };   
       this.write = function (what){
          this.el.textContent += what;       
       }; 
       this.set = function (what){
          this.el.textContent = what;       
       };
       this.clear = this.set.bind(this, '');
       this.log = this.print;
       this._log = this._print;
       this.slog = function (what) {
          if (undefined === what) what = 'undefined';
          this.log(JSON.stringify(what));
       };
       this.slog_key = this.slog;
       this.rlog = function (what) {
          this.el.textContent += what  + '\n'; 
		  return what;    
       };
       this.all = function (obj) {
          this.slog( getAllKeysAndValues(obj) );
       };
       this.br = function (){
          this.el.textContent += '\n';       
       };
       this.console = function(){
		  window.console.log = this.log;     //  idea:  window.console.log = Out.log;   
       };
	   this.leftpad = function (str, len, ch){  // is also here: /g/leftpad
         str = String(str);
         let i = -1;
         if (!ch && ch !== 0) ch = ' ';
         len = len - str.length;
         while (++i < len) 
           str = ch + str;
         return str;   
       }
    }
    return new inner;
})(); 
                    
                    
/*
                    
                    Usage:
                    <script src="/j/out"></script>
				    Out
						.log('txt')
						.log('txt2');

					Out.console();  to make console.log do the same as Out.log



					provide '' as last argument in the list to prevent automatic caret return append
                    Out.log('z', 'v', '')
                       .log( 'u', 'k');
                    //zvuk
                    Out.log('c', 'v')
                       .log( 'e', 't');
                    //cv
                    //et
                    Out.style.color = 'blue'

					Out.log(Out.leftpad('xx',8,'0')); // 000000xx   т.е. Out.leftpad('xx',8,'0')==='000000xx'
					конечно было бы круче сделать что-то типа Out.leftpad.log или Out.log.leftpad в стилистике should.be.below
                    
*/
                