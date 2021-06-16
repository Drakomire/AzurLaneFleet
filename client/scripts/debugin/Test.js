var damageData = [
    [
        [5,30],
        [32,300]
        [25,150],
    ],
    [
        [6,40],
        [1.5,12],
        [24,240]
    ],
    [
        [4,25],
        [8,50],
        [26,160]
    ],
    [
        [18,300],
        [4,25],
        [19,150]
    ],
    [
        [22,270],
        [4,25],
        [23,125]
    ],
    [
        [20,240],
        [4,25],
        [21,100]
    ]
]
var baseOffsetX = 50
var baseOffsetY = 300
var frstRn = true

const canvas = document.getElementById("dpsgraph")
const ctx = canvas.getContext("2d")

function drawgraph(damageData){
    damageData.forEach(datapoint=>{
        datapoint.forEach(damageloop=>{
            ctx.beginPath()
            ctx.moveTo(baseOffsetX,baseOffsetY)
            let damageCount = 0
            for(let i= damageloop[0];i<120;i+damageloop[0]){
                ctx.lineTo(baseOffsetX+i,baseOffsetY-)
            }
        })
    })
}
function drawlegnd()