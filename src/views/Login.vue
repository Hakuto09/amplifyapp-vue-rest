<template>
    <div class="login">
        <!--ログインコンポーネント-->
        <amplify-authenticator>
          <amplify-sign-out></amplify-sign-out>
        </amplify-authenticator>
    </div>
</template>

<script>
    console.log("Login.vue:", " After import: ");

    export default {
        name: 'login'
    }
</script>
