<template>
    <!-- <div> -->
    <div class="col-12 col-md-6 mb-4 mb-lg-0 col-lg-6">
        <div class="card">
            <h5 class="card-header">Total {{ header }}</h5>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-2">
                        <h5 class="card-title">
                            <font-awesome-icon :icon="icons" size="3x" />
                        </h5>
                    </div>
                    <div class="col-lg-10">
                        <p class="card-text fs-5">Sebanyak: {{ value }} {{ afterValue }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    props: {
        header: String,
        icons: String,
        value: String,
        afterValue: String,

    }
}
</script>