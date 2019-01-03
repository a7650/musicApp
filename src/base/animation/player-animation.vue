<template>
     <transition name="player">
        <slot></slot>
    </transition>
</template>

<script>
import animated from 'animate.css'
export default {

}
</script>

<style>
.player-enter{
    margin-top: 600px;
    opacity: 0;
}
.player-leave-to{
    transform: translate(0,100%);
    opacity: .3;
}
</style>
