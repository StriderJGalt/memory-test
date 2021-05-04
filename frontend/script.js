const digits = new Set([0,1,2,3,4,5,6,7,8,9]);
const sleep_duration = 1000;
const bw_sequences = [
    [1,0,8],
    [7,5,2,9],
    [5,3,9,4,6],
    [9,1,5,3,8,2],
    [7,4,6,8,0,5,1],
    [8,4,7,3,0,2,5,7]
];
const colour_sequences = [
    [1,0,8],
    [7,5,2,9],
    [5,3,9,4,6],
    [9,1,5,3,8,2],
    [7,4,6,8,0,5,1],
    [8,4,7,3,0,2,5,7]
];
const exp_test_html = `<div id="exp-test">
<div id="preview"></div>
<div id="keypad">
    <div id="key1" onclick="input(1)">1</div>
    <div id="key2" onclick="input(2)">2</div>
    <div id="key3" onclick="input(3)">3</div>
    <div id="key4" onclick="input(4)">4</div>
    <div id="key5" onclick="input(5)">5</div>
    <div id="key6" onclick="input(6)">6</div>
    <div id="key7" onclick="input(7)">7</div>
    <div id="key8" onclick="input(8)">8</div>
    <div id="key9" onclick="input(9)">9</div>
    <div id="key_clear" onclick="input('clear')" class="textbtn">clear</div>
    <div id="key0" onclick="input(0)">0</div>
    <div id="key_done" onclick="input('done')" class="textbtn">done</div>
</div>
</div>`;

var status = 1;
var input_sequence = [];
var current_sequence = [];

// values to be saved
var subject_name;
var subject_age;
var subject_cb;
var bw_recall;
var colour_recall;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function display(disp,sequence,colour) {
    disp.innerText = "";
    console.log(sequence);
    for (i=0; i<sequence.length; i++) {
        if (!colour) {
            disp.className = 'white';
        }
        // console.log(i);
        let digit = sequence[i];
        // console.log(digit);
        if (digits.has(digit)) {
            if (colour) {
                disp.className = 'c'+digit;
            }
            disp.innerText = digit;
            await sleep(sleep_duration);
            disp.innerText = "";
            await sleep(sleep_duration);
        }
        else {
            console.log("Error: sequence contains non digit");
            console.log(toString(digit));
        }
    }
}


function input(key) {
    var p = document.getElementById("preview")
    if (key == 'clear') {
        p.innerText = "";
        input_sequence = [];
    }
    else {
        if (key == 'done') {
            if (JSON.stringify(current_sequence)==JSON.stringify(input_sequence)) {
                p.innerText = "CORRECT";
                status = 1;
            }
            else {
                p.innerText = "WRONG";
                status = -1;
            }
            input_sequence = [];
        }
        else {
            input_sequence.push(key);
            p.innerText = input_sequence.join(" ");
        }
    }
}

async function main() {
    subject_name = document.getElementById("name_input").value
    subject_age = document.getElementById("age_input").value
    subject_cb = document.getElementById("cb_input").value
    console.log(subject_name)
    console.log(subject_age)
    console.log(subject_cb)
    body = document.getElementsByTagName("body")[0]
    for(s_index=0;s_index<bw_sequences.length;s_index+=1) {
        console.log('start iteration:'+ (s_index).toString());
        current_sequence = bw_sequences[s_index];
        body.innerHTML = '<div id="exp-display"></div>';
        var disp = document.getElementById("exp-display");
        await display(disp,current_sequence, false);
        status = 0;
        body.innerHTML = exp_test_html;
        while(status == 0) {
            console.log('testing');
            await sleep(500);
        }

        if (status == -1) {
            // value to be saved
            bw_recall = s_index+2;
            break;
        }
        console.log('end iteration:'+ (s_index).toString());
    }
    for(s_index=0;s_index<colour_sequences.length;s_index+=1) {
        console.log('start iteration:'+ (s_index).toString());
        current_sequence = colour_sequences[s_index];
        body.innerHTML = '<div id="exp-display"></div>';
        var disp = document.getElementById("exp-display");
        await display(disp,current_sequence, true);
        status = 0;
        body.innerHTML = exp_test_html;
        while(status == 0) {
            console.log('testing');
            await sleep(500);
        }
        
        if (status == -1) {
            // value to be saved
            colour_recall = s_index+2;
            break;
        }
        console.log('end iteration:'+ (s_index).toString());
    }
    console.log('bw recall:'+(bw_recall).toString());
    console.log('colour recall:'+(colour_recall).toString());
    console.log("finished");
    
}