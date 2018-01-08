var Main = Vue.component("Main",{
    template:`
    <div class="template">
        <div class="con">
            <div class="left">
                <router-view name="left"></router-view>
            </div>
            <div class="right">
                <router-view name="right"></router-view>
            </div>
        </div>
    </div>
    `
})
var Left = Vue.component("Left",{
    data(){
        return{
            menu:[
            ]
        }
    },
    computed:{
        data(){
            var arr = [];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i]
                    arr.push(obj);
                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i])
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i])
                            }
                        }
                    }
                }
            }
            console.dir(arr);
            return arr;
        }

    },
    methods:{
    },
    created(){
        fetch("./dome.txt").then(function (e) {
            return e.json();
        }).then((e)=>{
            this.menu=e;
        })
    },
    template:`
       <div>
            <ul>
               <div v-for="item in data">
                 <li>
                    <router-link :to="'#'+item.id" active-class="aa" class="link" :id="'a'+item.id">
                       {{item.title}}
                    </router-link>
                 </li>
                 <ul>
                    <li v-for="item1 in item.child">
                    <router-link :to="'#'+item1.id" :id="'a'+item1.id" active-class="bb" class="link1">
                    {{item1.title}}
</router-link>
                    
                    </li>
                 </ul>
               </div>
            
            </ul>
</div>
    `,

})
var Right = Vue.component("Right",{
    data(){
        return{
            data:"",
        }

    },
    template:`
       <div class="markdown-body" v-html="data">
    
       </div>
    `,
    mounted(){
        fetch("./doc.txt").then(function (e) {
            return e.text();
        }).then((e)=>{
            this.data=e;
        })

    },
    watch:{
        $route(){
            var num = this.$route.hash.slice(1);
            var pos = document.querySelector(".a"+num).offsetTop-50;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ number: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ number: pos }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.number.toFixed(0)
                })
                .start()
            animate()
        }
    }
})
var Quick = Vue.component("Quick",{
    template:`
    <div class="quick">
        
        qwertyuiopasdfghdfghjkl;,mnbvgf<br>
        qwertyuiopasdfghdfghjkl;,mnbvgf<br>
        qwertyuiopasdfghdfghjkl;,mnbvgf<br>
        qwertyuiopasdfghdfghjkl;,mnbvgf<br>
        qwertyuiopasdfghdfghjkl;,mnbvgf<br>
</div>
    `
})