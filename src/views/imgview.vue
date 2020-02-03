<template>
    <div>
        <div>
        <div  class="imgzoom_pack">
        <div class="imgzoom_x">
          X
        </div>
        <div class="imgzoom_img">
          <img> 
        </div>
      </div>
      </div>

            <img src="../assets/nopic.png"  class="listImg">

    </div>
</template>
<script>
import scale from"../assets/scale"
export default {
mounted(){

    scale.ImagesZoom.init({
			"elem" : ".listImg"
		});

}
}
</script>
<style  scoped>
@import "../assets/scale.css";
</style>