window.onload = () => {


    document.getElementById('value').onpaste = e => {
        e.preventDefault()
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        e.target.value+=paste+"\n"
    }

    document.getElementById('convert').onclick = e => {

        const value = document.getElementById('value').value;
        const results = document.getElementById('results');
        const results_area = document.getElementById('results_area');

        const yt_results_area = document.getElementById('yt_results_area');
        const project_name = document.getElementById('project_name');

        results.innerHTML=""
        results_area.value ="" 
        yt_results_area.value ="" 

        let frag = document.createRange().createContextualFragment(value)
        let links = []
        frag.querySelectorAll('a').forEach(n => links.push(n.href))
        links = [...new Set(links)]
        let content_results = ''
        // youtube-dl -o "1-%(uploader)s%(title)s.%(ext)s" https://youtu.be/862r3XS2YB0

        for(const [i,link] of links.entries()){
            params = link.split("=")
            video_id = params.pop()
            video_url = `https://fast.wistia.net/embed/iframe/${video_id}?videoFoam=true`
            a = `<a href='${video_url}' download='${video_id}'>${video_id}</a><br/>`
            results.innerHTML+= a
            results_area.value+=video_url+"\n"

            yt_results_area.value+=`youtube-dl -o "${i.toString().padStart(2, "0")}-${project_name.value.trim()}-%(title)s" ${video_url}\n`

        }
        


    }
}


/*
<p>
    <a href="https://marketing-underground.teachable.com/courses/623154/lectures/11139931?wvideo=ekitib9wp9">
        <img src="https://embed-ssl.wistia.com/deliveries/48d0b273614250a5c583cb55ee64be9b6dded032.jpg?image_crop_resized=800x450&image_play_button_size=2x&image_play_button=1&image_play_button_color=ff3f20e0" width="400" height="225" style="width: 400px; height: 225px;">
    </a>
</p>
<p>
    <a href="https://marketing-underground.teachable.com/courses/623154/lectures/11139931?wvideo=ekitib9wp9">Introduction | Marketing Underground</a>
</p>
*/