<template>
  <fragment>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
          <v-btn
            class="mx-2"
            v-on="on"
            @click="initUpdateBalanceDialog"
          >
          한도 변경하기
          </v-btn>
      </template>
      <span>한도 변경 금액을 확인 후 입력해 주세요.</span>
    </v-tooltip>
    <v-dialog v-if="isUpdateTotalDialog"
      v-model="isUpdateTotalDialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">
          한도 변경하기
        </v-card-title>
        <v-form
          class="px-7"
          fluid
        >
          <v-row>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <v-checkbox
                v-model="isUpdateTotalCheckbox.add"
                label="증액"
                @change="changeTotalBalanceCheckBox(0, isUpdateTotalCheckbox.add)"
              ></v-checkbox>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              md="4"
            >
              <v-checkbox
                v-model="isUpdateTotalCheckbox.minus"
                label="감액"
                @change="changeTotalBalanceCheckBox(1, isUpdateTotalCheckbox.minus)"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-text-field
            type="number"
            label="변경 금액"
            prepend-icon="mdi-currency-krw"
            v-model="changeBalance"
          />
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="validationBalance(changeBalance)"
          >
            변경하기
          </v-btn>
          <v-btn
            text
            @click="isUpdateTotalDialog = false"
          >
            취소하기
          </v-btn>
        </v-card-actions>
        <v-alert v-if="rules.isError"
          dense
          outlined
          type="error"
        >
          <strong>{{rules.msgAlert}}</strong>
        </v-alert>
      </v-card>
    </v-dialog>
    <v-dialog v-if="isConfirmDialog"
        v-model="isConfirmDialog"
        max-width="400"
      >
        <v-card>
          <v-card-title>
            <span>금액 <strong>{{ getChangeBalance }}</strong> {{msgConfirmDialog}} </span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              text
              @click="updateTotalBalance(changeBalance)"
            >
              확인
            </v-btn>
            <v-btn
              text
              @click="isConfirmDialog = false"
            >
              취소
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </fragment>
</template>

<script>
import corpStore from '@/mixins/corpStore';
import utils from '@/utils/utils';

export default {
  name: 'UpdateLimitBalance',
  mixins: [corpStore],
  data: () => ({
    isConfirmDialog: false,
    isUpdateTotalDialog: false,
    isUpdateTotalCheckbox: {
      add: true,
      minus: false,
    },
    changeBalance: '',
    rules: {
      minValue: 1,
      maxValue: 3000000,
      isError: false,
      msgAlert: '',
    },
    msgConfirmDialog: '',
  }),
  created() {
  },
  mounted() {
  },
  computed: {
    getChangeBalance() {
      return utils.numberWithCommas(Number(this.changeBalance));
    },
  },
  methods: {
    initUpdateBalanceDialog() {
      this.isUpdateTotalDialog = true;
      this.isUpdateTotalCheckbox = {
        add: true,
        minus: false,
      };
      this.changeBalance = '';
    },
    initConfirmDialog() {
      this.isConfirmDialog = true;
      const index = Object.values(this.isUpdateTotalCheckbox).findIndex((item) => item === true);
      const change = index === 0 ? '추가' : '감액';
      this.msgConfirmDialog = `원을 ${change} 하시겠습니까?`;
    },
    changeTotalBalanceCheckBox(index, isState) {
      if (index === 0) {
        this.isUpdateTotalCheckbox.add = isState;
        this.isUpdateTotalCheckbox.minus = !isState;
      } else {
        this.isUpdateTotalCheckbox.add = !isState;
        this.isUpdateTotalCheckbox.minus = isState;
      }
    },
    validationBalance(changeBalance) {
      const balance = Number(changeBalance);
      if (balance < this.rules.minValue) {
        this.rules.isError = true;
        this.rules.msgAlert = `최저 입력 금액 : ${this.rules.minValue}원`;
        setTimeout(() => {
          this.rules.isError = false;
        }, 3000);
      } else if (balance > this.rules.maxValue) {
        this.rules.isError = true;
        this.rules.msgAlert = `최대 입력 금액 : ${this.rules.maxValue}원`;
        setTimeout(() => {
          this.rules.isError = false;
        }, 3000);
      } else {
        this.initConfirmDialog();
      }
    },
    updateTotalBalance(changeBalance) {
      const balance = Number(changeBalance);
      this.isUpdateTotalDialog = false;
      this.isConfirmDialog = false;
      const index = Object.values(this.isUpdateTotalCheckbox).findIndex((item) => item === true);
      this.updateLimitBalance({
        limitBalance: index === 0 ? this.limitBalance + balance : this.limitBalance - balance,
        balance: index === 0 ? this.totalBalanceAmount + balance : this.totalBalanceAmount - balance,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
