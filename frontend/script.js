const digits = new Set([0,1,2,3,4,5,6,7,8,9]);
const sleep_duration = 1000;
const bw_sequences = [
    [1,0,8],
    [7,5,2,9],
    [5,3,9,4,6],
    [9,1,5,3,8,2],
    [7,4,6,8,0,5,1],
    [8,4,7,3,0,2,5,7],
	[3,1,0,2,4,0,8,2,3],
	[2,4,7,5,9,4,8,5,6,1],
	[0,9,7,7,8,3,1,5,0,9,3],
	[5,5,0,0,3,2,3,4,1,8,7,0],
	[8,9,2,0,7,2,4,5,5,3,5,4,4],
	[3,4,1,7,9,6,2,0,5,3,3,0,5,2]
];
const colour_sequences = [
    [8,5,2],
    [1,9,4,3],
    [6,0,7,2,8],
    [4,7,9,3,5,0],
    [2,8,1,6,4,9,3],
    [5,3,7,2,0,9,3,8],
	[0,1,7,3,6,7,1,7,5],
	[5,9,3,4,1,2,8,6,5,7],
	[8,0,1,5,4,3,8,3,3,2,3],
	[7,3,4,9,1,4,4,6,7,6,6,7],
	[0,0,5,5,4,4,9,4,2,2,7,3,5],
	[6,4,1,8,6,2,7,1,4,3,0,1,1,6]
];
const bw_exp_test_html = `<div id="exp-test">
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
const colour_exp_test_html = `<div id="exp-test">
<div id="preview"></div>
<div id="keypad">
    <div id="key1" class="c1"onclick="input(1)">1</div>
    <div id="key2" class="c2"onclick="input(2)">2</div>
    <div id="key3" class="c3"onclick="input(3)">3</div>
    <div id="key4" class="c4"onclick="input(4)">4</div>
    <div id="key5" class="c5"onclick="input(5)">5</div>
    <div id="key6" class="c6"onclick="input(6)">6</div>
    <div id="key7" class="c7"onclick="input(7)">7</div>
    <div id="key8" class="c8"onclick="input(8)">8</div>
    <div id="key9" class="c9"onclick="input(9)">9</div>
    <div id="key_clear" onclick="input('clear')" class="textbtn">clear</div>
    <div id="key0" class="c0" onclick="input(0)">0</div>
    <div id="key_done" onclick="input('done')" class="textbtn">done</div>
</div>
</div>`;
const endpage_html = `<div class="endpage">
<h1>Thank you for participating!</h1>
<h1>Have a nice day!</h1>
</div>`
const success_buffer_html = `<div class="buffer">
<h2>Congratulations!</h2>
<h3>You recalled last sequence perfectly</h3>
<h3>Proceeding to next sequence ...</h3>
</div>`
const failure_buffer_html = `<div class="buffer">
<h2>Incorrect!</h2>
<h3>You failed to recalled last sequence perfectly</h3>
<h3>Proceeding to next component ...</h3>
</div>`
const instructionpage_html = `<div class="instructions">
<h1>Instructions</h1>
<ul>
    <li>This experiment consists of two components</li>
    <li>In each component the objective is to determine the max length of a sequence of digits that you can recall.</li>
    <li>You will be shown sequences of length starting from 3 and increasing till you fail to recall it accurately.</li>
    <li>For each sequence, the digits will be shown one by one and at the end a numeric keypad is provided.</li>
    <li>Enter the digits in the order they appeared in the sequence and click on done to move forward.</li>
    <li>The experiment cannot be paused in between.</li>
</ul>
<button class="btn btn-light" id="next_btn2" onclick="main()">Start Experiment</button>
</div>`

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

function premain() {
    subject_name = document.getElementById("name_input").value;
    subject_age = document.getElementById("age_input").value;
    subject_cb = document.getElementById("cb_input").value;
    console.log(subject_name);
    console.log(subject_age);
    console.log(subject_cb);
    body = document.getElementsByTagName("body")[0];
    body.innerHTML = instructionpage_html;
}
async function main() {
    body = document.getElementsByTagName("body")[0]
    body.innerHTML = ""
    await sleep(500);
    for(s_index=0;s_index<bw_sequences.length;s_index+=1) {
        console.log('start iteration:'+ (s_index).toString());
        current_sequence = bw_sequences[s_index];
        body.innerHTML = '<div id="exp-display"></div>';
        var disp = document.getElementById("exp-display");
        await display(disp,current_sequence, false);
        status = 0;
        body.innerHTML = bw_exp_test_html;
        while(status == 0) {
            console.log('testing');
            await sleep(500);
        }

        if (status == -1) {
            // value to be saved
            bw_recall = s_index+2;
            break;
        }
        body.innerHTML = success_buffer_html;
        await sleep(2000)
        body.innerHTML = ""
        await sleep(1000)
        console.log('end iteration:'+ (s_index).toString());
    }
    body.innerHTML = failure_buffer_html;
    await sleep(2500);
    for(s_index=0;s_index<colour_sequences.length;s_index+=1) {
        console.log('start iteration:'+ (s_index).toString());
        current_sequence = colour_sequences[s_index];
        body.innerHTML = '<div id="exp-display"></div>';
        var disp = document.getElementById("exp-display");
        await display(disp,current_sequence, true);
        status = 0;
        body.innerHTML = colour_exp_test_html;
        while(status == 0) {
            console.log('testing');
            await sleep(500);
        }
        
        if (status == -1) {
            // value to be saved
            colour_recall = s_index+2;
            break;
        }
        body.innerHTML = success_buffer_html;
        await sleep(2000)
        body.innerHTML = ""
        await sleep(1000)
        console.log('end iteration:'+ (s_index).toString());
    }
    body.innerHTML = endpage_html;
    console.log('bw recall:'+(bw_recall).toString());
    console.log('colour recall:'+(colour_recall).toString());
    console.log("finished");
	send_data();
    
}

function send_data() { 
	$.ajax('http://0.0.0.0:8000/send', {
    type: 'POST',
    data: { 
		name: subject_name,
		age: subject_age,
		cb: subject_cb,
		bw: bw_recall,
		cw: colour_recall,
	},
    success: function (data, status, xhr) {
        $('#status').append("Data saved");
    },
    error: function (jqXhr, textStatus, errorMessage) {
		$('#status').append('Error saving data');
    }
});
}
