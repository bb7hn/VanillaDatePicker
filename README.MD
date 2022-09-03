# VanillaDatePicker
## Presentation
Vanilla Date Picker is pure js date picker powered by Bootstrap (v5.2.0).
At the moment it is not stable and **only supports *TURKISH***. I'm still developing it.
## How To Use (Installation and usage)
### [See The Demo](https://bb7hn.github.io/VanillaDatePicker/)
### Quick Start
- [Download](https://github.com/bb7hn/VanillaDatePicker/archive/refs/heads/main.zip) or clone this repo :
```bash
git clone https://github.com/bb7hn/VanillaDatePicker.git
```
- Then go to index.html and copy code
### Code
- First be sure you included Bootstrap (v5.2.0 is suggested version)
-Then include vanillaPicker.min.js in your head tag
```HTML
    <title>Vanilla Date Picker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
    <script type="module" src="vanillaPicker.min.js"></script>
```
- Lastly create a date input in body with '***vanilla-input***' class name  and see the results.
```HTML
    <input type="date" class="vanilla-input form-control mt-5" id="date">
```
- If you need to add an eventListener:
```html
<script>
    const setEventListener = ()=>{
        if(!window.pickersInitCompleted){
            setTimeout(() => {
                setEventListener();
            }, 500);
            return false;
        }
        document.getElementById('date').addEventListener('change',e=>{
            let input = e.target;
            console.log(input.value);
            
        });
        return true;
    }
    document.addEventListener('DOMContentLoaded',()=>{
        setEventListener();
    });
</script>
```
<details>
   <summary><b>Full Code</b></summary>

   ```HTML
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vanilla Date Picker</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
            <script type="module" src="vanillaPicker.min.js"></script>
        </head>
        <body class="d-flex align-items-center justify-content-center container-fluid">
            <input type="date" class="vanilla-input form-control mt-5" id="date">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
            <script>
                const setEventListener = ()=>{
                    if(!window.pickersInitCompleted){
                        setTimeout(() => {
                            setEventListener();
                        }, 500);
                        return false;
                    }
                    document.getElementById('date').addEventListener('change',e=>{
                        let input = e.target;
                        console.log(input.value);
                        
                    });
                    return true;
                }
                document.addEventListener('DOMContentLoaded',()=>{
                    setEventListener();
                });
            </script>
        </body>
    </html>
   ```
</details>

### Support Me
If you want to contribute you can contact me at iletisim@batuhanozen.com <br>
Hope results are satisfying for u my friend.
<br>
With my king regards.