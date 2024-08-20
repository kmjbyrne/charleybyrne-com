<template lang="html">
    <section class="panel m1 p1">
        <h1>Conversion Tables</h1>
        <p>Imperial to metric common conversions.</p>

        <input class="search" type="text" v-model="search" placeholder="Search substance" />

        <table class="table">
            <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Ounces</th>
                    <th>Grams</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1 cup butter (2 sticks)</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1/2 cup butter (1 stick)</td>
                    <td>4 oz.</td>
                    <td>112 g</td>
                </tr>
                <tr>
                    <td>1 tablespoon butter</td>
                    <td>½ oz.</td>
                    <td>14 g</td>
                </tr>
                <tr>
                    <td>1 cup all-purpose flour</td>
                    <td>5 oz.</td>
                    <td>140 g</td>
                </tr>
                <tr>
                    <td>1 cup whole wheat flour</td>
                    <td>5 oz.</td>
                    <td>140 g</td>
                </tr>
                <tr>
                    <td>1 cup granulated sugar</td>
                    <td>7 oz.</td>
                    <td>200 g</td>
                </tr>
                <tr>
                    <td>1 cup brown sugar</td>
                    <td>7 ½ oz.</td>
                    <td>210 g</td>
                </tr>
                <tr>
                    <td>1 cup powdered sugar</td>
                    <td>4 oz.</td>
                    <td>110 g</td>
                </tr>
                <tr>
                    <td>1 cup chocolate chips</td>
                    <td>6 oz.</td>
                    <td>170 g</td>
                </tr>
                <tr>
                    <td>1 cup chocolate chunks</td>
                    <td>5 oz.</td>
                    <td>140 g</td>
                </tr>
                <tr>
                    <td>1 cup chopped nuts</td>
                    <td>4 oz.</td>
                    <td>110 g</td>
                </tr>
                <tr>
                    <td>1 cup ground nuts</td>
                    <td>4 ½ oz.</td>
                    <td>130 g</td>
                </tr>
                <tr>
                    <td>1 cup raisins</td>
                    <td>5 ½ oz.</td>
                    <td>155 g</td>
                </tr>
                <tr>
                    <td>1 cup rolled oats (old-fashioned oats)</td>
                    <td>4 oz.</td>
                    <td>110 g</td>
                </tr>
                <tr>
                    <td>1 cup quick oats (instant oats)</td>
                    <td>3 ½ oz.</td>
                    <td>100 g</td>
                </tr>
                <tr>
                    <td>1 cup graham cracker crumbs</td>
                    <td>4 oz.</td>
                    <td>120 g</td>
                </tr>
                <tr>
                    <td>1 cup unsweetened cocoa powder</td>
                    <td>3 oz.</td>
                    <td>80 g</td>
                </tr>
                <tr>
                    <td>¼ cup unsweetened cocoa powder</td>
                    <td>¾ oz.</td>
                    <td>20 g</td>
                </tr>
                <tr>
                    <td>1 cup oil</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1 tablespoon oil</td>
                    <td>½ oz.</td>
                    <td>14 g</td>
                </tr>
                <tr>
                    <td>1 cup heavy cream</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1 cup buttermilk</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1 cup yogurt</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1 cup sour cream</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1 cup honey</td>
                    <td>12 oz.</td>
                    <td>335 g</td>
                </tr>
                <tr>
                    <td>1 cup mashed bananas</td>
                    <td>8 oz.</td>
                    <td>225 g</td>
                </tr>
                <tr>
                    <td>1 cup peanut butter</td>
                    <td>9 oz.</td>
                    <td>250 g</td>
                </tr>
                <tr>
                    <td>1 teaspoon baking powder</td>
                    <td>-</td>
                    <td>5 g</td>
                </tr>
            </tbody>
        </table>

        <br />

        <table class="table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Cups</th>
                    <th>Imperial</th>
                    <th>Metric</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(l, idx) in liquids[0]" :key="l">
                    <td>Liquid</td>
                    <td>{{ l }}</td>
                    <td>{{ liquids[1][idx] }}</td>
                    <td>{{ liquids[2][idx] }}</td>
                </tr>
                <tr v-for="(l, idx) in flours[0]" :key="l">
                    <td>Flours</td>
                    <td>{{ l }}</td>
                    <td>{{ flours[1][idx] }}</td>
                    <td>{{ flours[2][idx] }}</td>
                </tr>
                <tr v-for="(l, idx) in granules[0]" :key="l">
                    <td>Sugar</td>
                    <td>{{ l }}</td>
                    <td>{{ granules[1][idx] }}</td>
                    <td>{{ granules[2][idx] }}</td>
                </tr>
                <tr v-for="(l, idx) in butter[0]" :key="l">
                    <td>Butter</td>
                    <td>{{ l }}</td>
                    <td>{{ butter[1][idx] }}</td>
                    <td>{{ butter[2][idx] }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        const cups = ["1/4 cup", "1/3 cup", "1/2 cup", "2/3 cup", "3/4 cup", "1 cup"];
        const liquids = [];
        liquids[0] = cups;
        liquids[1] = ["2fl oz", "3fl oz", "4fl oz", "5fl oz", "6fl oz", "8fl oz"];
        liquids[2] = ["60ml", "93ml", "120ml", "150ml", "180ml", "240ml"];

        const flours = [];
        flours[0] = cups;
        flours[1] = ["1.13 oz", "1.5 oz", "2.2 oz", "3 oz", "3.3 oz", "4.5 oz"];
        flours[2] = ["32g", "43g", "64g", "85g", "96g", "128g"];

        const granules = [];
        granules[0] = cups;
        granules[1] = ["1.78 oz", "2.37 oz", "3.55 oz", "4.78 oz", "5.3 oz", "7.1 oz"];
        granules[2] = ["50g", "67g", "100g", "134g", "150g", "201g"];

        const butter = [];
        butter[0] = cups;
        butter[1] = ["2 oz", "2.67 oz", "4 oz", "5.37 oz", "6 oz", "8 oz"];
        butter[2] = ["57g", "76g", "113g", "152g", "170g", "227g"];

        return {
            liquids,
            flours,
            granules,
            butter,
            search: "",
        };
    },
});
</script>
<style lang="scss">
.table {
    .thead {
        text-align: left;
    }
    tbody {
        tr:nth-child(even) {
            background-color: rgb(239, 239, 239);
        }
    }
}
</style>
