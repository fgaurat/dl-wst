window.onload = () => {


    document.getElementById('value').onpaste = e => {
        e.preventDefault()
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        e.target.value+=paste+"\n"
    }
    
    document.getElementById('btn_clear_all').onclick = e => {
        document.getElementById('value').value=""
        document.getElementById('results').innerHTML=""
        document.getElementById('results_area').value=""
        document.getElementById('yt_results_area').value=""
        document.getElementById('yt_results_area_win').value=""

    }

    document.getElementById('convert').onclick = e => {

        const value = document.getElementById('value').value;
        const results = document.getElementById('results');
        const results_area = document.getElementById('results_area');

        const yt_results_area = document.getElementById('yt_results_area');
        const yt_results_area_win = document.getElementById('yt_results_area_win');
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

            yt_results_area.value+=`youtube-dl -o "${i.toString().padStart(2, "0")}-${project_name.value.trim()}-%(title)s" ${video_url} &\n`
            yt_results_area_win.value+=`youtube-dl -o "${i.toString().padStart(2, "0")}-${project_name.value.trim()}-%(title)s" ${video_url}\n`

        }
        


    }
}
