<template>
  <v-container>
    <!-- 삭제 확인 -->
    <v-snackbar
      v-model="snackbar"
      :centered="true"
    >
      선택한 항목을 삭제하시겠습니까?
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="onDelete"
        >
          OK
        </v-btn>
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          CLOSE
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey">
          상세 보기
        </v-card-title>

        <v-data-table
          :headers="headers_dialog"
          :items="dialogData"
          hide-default-header
          hide-default-footer
          class="elevation-1"
        />
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols=7>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-card-title class="justify-center" v-bind="attrs" v-on="on">
              <v-btn text rounded><v-icon>mdi-arrow-left</v-icon></v-btn>
              법인카드 사용내역서
              <v-btn text rounded><v-icon>mdi-arrow-right</v-icon></v-btn>
            </v-card-title>
            <v-alert dense outlined dismissible type="error"
              v-show="historyList.length <= 0 && isLoadingMaxWait">
              님아 데이터를 가져오는데 <strong>최대대기 시간 2초</strong>가 초과됐습니다. <strong>새로고침</strong> 해주셈 ㄱㄱㄱㄱ
            </v-alert>
          </template>
          <span>사용내역 항목을 클릭하면 상세내역 확인 가능합니다.</span>
        </v-tooltip>

        <!-- 구분선 -->
        <v-divider></v-divider>

        <!-- 사용내역 테이블 -->
        <v-data-table
          :headers="headers"
          :items="historyList"
          :items-per-page="10"
          class="elevation-2"
          height="570"
          :loading="isLoading"
          :loading-text="loadingText"
          fixed-header
          show-select
          :singleSelect="!multiSelect"
          :sort-by="['usedDate']"
          item-key="timeInMs"
          v-model="selected"
          @click:row="onClick"
        >
          <template v-slot:top>
            <v-switch
              v-model="multiSelect"
              label="다중 선택 활성화"
              class="pa-3"
            ></v-switch>
          </template>
        </v-data-table>
        <div class="table-footer-prepend d-flex pl-2 align-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-fab-transition>
                <v-btn
                  v-show="selected.length > 0"
                  class="mx-2"
                  fab
                  dark
                  small
                  color="error"
                  v-on="on"
                  @click="onButtonClick"
                >
                  <v-icon dark>
                    mdi-minus
                  </v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
            <span>선택항목 삭제</span>
          </v-tooltip>
        </div>
      </v-col>

      <!-- 구분선 -->
      <v-col cols=1>
        <v-divider vertical class="pl-14"></v-divider>
      </v-col>
      <v-col cols=4>
      <!-- 사용내역 입력란 -->
        <v-col cols=12>
          <v-card>
            <v-card-title>Summary</v-card-title>
            <v-card-actions>
                <v-card-text>한도 총액 : {{ getLimitBalance }}원</v-card-text>
                <v-card-text>사용 총합계 : {{ getTotalUsedAmount }}원</v-card-text>
                <v-card-text>잔액: {{ getTotalBalanceAmount }}원</v-card-text>

              <v-dialog
                v-model="isUpdateTotalDialog"
                persistent
                max-width="300"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="initModalUpdateTotal"
                  >
                    한도 변경하기
                  </v-btn>
                </template>
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
                          label="추가"
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
                          label="삭제"
                          @change="changeTotalBalanceCheckBox(1, isUpdateTotalCheckbox.minus)"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                    <v-text-field
                      type="number"
                      label="변경 금액"
                      prepend-icon="mdi-currency-krw"
                      v-model="changeBalance"
                      :rules="[rules.loanMin(changeBalance, rules.minValue), rules.loanMax(changeBalance, rules.maxValue)]"
                    />
                  </v-form>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="updateTotalBalance(changeBalance)"
                    >
                      변경하기
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="isUpdateTotalDialog = false"
                    >
                      취소하기
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols=12>
          <v-card>
            <v-card-title>
              <h5 class="display-5">사용내역 입력</h5>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-- 사용일시 -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="usedDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="usedDate"
                      label="사용일시"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="usedDate"
                    no-title
                    scrollable
                    :max="todayDate"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(usedDate)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <!-- 사용일시 -->

                <!-- 분류 -->
                <v-autocomplete
                  v-model="category"
                  :items="categoryList"
                  dense
                  filled
                  label="분류"
                  prepend-icon="mdi-sort-reverse-variant"
                  :rules="categoryRules"
                ></v-autocomplete>

                <v-text-field label="고객사" prepend-icon="mdi-target" v-model="customer"
                  :rules="customerRules"/>
                <v-text-field label="사용목적 또는 사유(상세히)" prepend-icon="mdi-note-text-outline"
                  v-model="purpose" :rules="purposeRules"/>
                <v-text-field label="사용금액" prepend-icon="mdi-currency-krw" v-model="amount"
                  :rules="amountRules"/>
                <v-text-field label="기타(메모)" prepend-icon="mdi-note-plus-outline" v-model="memo"/>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="register" :disabled="!valid">Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="initInputFields">Reset</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-col>
    </v-row>

    <!-- 분류별 합계 테이블 -->
    <v-row class="px-2 py-3">
      <v-col cols="7">
        <v-card>
          <v-card-title>
            <h5 class="display-5">분류별 합계</h5>
          </v-card-title>
          <v-divider></v-divider>
          <v-data-table
            :headers="headers_categorySummary"
            :items="getCategorySumList"
            :items-per-page="10"
            class="elevation-2"
            :loading="isLoading"
            :loading-text="loadingText"
            fixed-header
            item-key="timeInMs"
            hide-default-footer
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import corpStore from '@/mixins/corpStore';
import dayjs from 'dayjs';
import utils from '@/utils/utils';

export default {
  name: 'Statement',
  mixins: [corpStore],
  data: () => ({
    loadingText: '님아 사용내역을 가져오고 있습니다.. 인내심을 가지고 잠시만 기다려 주셈~ ㅋㅋㅋ',
    selected: [],
    multiSelect: false,
    todayDate: new Date().toISOString().substr(0, 10),
    usedDate: new Date().toISOString().substr(0, 10),
    category: '',
    customer: '',
    purpose: '',
    amount: '',
    memo: '',
    menu: false,
    categoryList: ['식사', '간식', '접대', '비품', '회식', '기타'],
    isLoadingMaxWait: false,
    categoryRules: [(v) => !!v || '분류 항목을 선택해 주세요'],
    customerRules: [(v) => !!v || '고객사 항목을 입력해 주세요'],
    purposeRules: [(v) => !!v || '사용목적 또는 사유(상세히) 항목을 입력해 주세요'],
    amountRules: [(v) => !!v || '사용금액 항목을 입력해 주세요'],
    valid: true,
    headers: [
      {
        text: '사용일시',
        align: 'center',
        sortable: true,
        value: 'usedDate',
      },
      {
        text: '분류',
        align: 'center',
        sortable: false,
        value: 'category',
      },
      {
        text: '고객사',
        align: 'center',
        sortable: false,
        value: 'customer',
      },
      {
        text: '사용목적 또는 사유(상세히)',
        align: 'center',
        sortable: false,
        value: 'purpose',
      },
      {
        text: '사용금액',
        align: 'center',
        sortable: false,
        value: 'amount',
      },
    ],
    headers_categorySummary: [
      {
        text: '분류',
        align: 'center',
        sortable: true,
        value: 'category',
      },
      {
        text: '합계',
        align: 'center',
        sortable: false,
        value: 'categorySum',
      },
    ],
    headers_dialog: [
      {
        text: 'title',
        align: 'start',
        value: 'name',
      },
      { text: 'value', value: 'values' },
    ],
    dialog: false,
    dialogData: [],
    snackbar: false,
    currentMonth: new Date().toISOString().substr(0, 7),
    isUpdateTotalDialog: false,
    isUpdateTotalCheckbox: {
      add: true,
      minus: false,
    },
    changeBalance: '',
    rules: {
      loanMin(value, min) {
        return (value || '') >= min || `최소금액 ${min}원`;
      },
      loanMax(value, max) {
        return (value || '') <= max || `최대금액 ${max}원`;
      },
      minValue: 1,
      maxValue: 3000000,
    },
  }),
  created() {
    this.initialize();
  },
  mounted() {
    this.getHistory();
    setTimeout(() => {
      this.isLoadingMaxWait = true;
    }, 2000);
  },
  computed: {
    isLoading() {
      return (this.historyList.length <= 0 && !this.isLoadingMaxWait);
    },
    getLimitBalance() {
      return utils.numberWithCommas(this.limitBalance);
    },
    getTotalBalanceAmount() {
      return utils.numberWithCommas(this.totalBalanceAmount);
    },
    getTotalUsedAmount() {
      return utils.numberWithCommas(this.historyList.reduce((accumulator, item) => accumulator + utils.stringWithCommasToNumber(item.amount), 0));
    },
    getCategorySumList() {
      const result = this.categoryList.map((category) => {
        const filterdList = this.historyList.filter((i) => i.category === category);

        let list = [];
        if (filterdList) {
          const sum = utils.numberWithCommas(filterdList.reduce((acc, item) => acc + utils.stringWithCommasToNumber(item.amount), 0));
          list = {
            category,
            categorySum: sum,
          };
        }

        return list;
      });

      return result;
    },
  },
  methods: {
    initInputFields() {
      this.usedDate = new Date().toISOString().substr(0, 10);
      this.category = '';
      this.customer = '';
      this.purpose = '';
      this.amount = 0;
      this.memo = '';

      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },
    register() {
      if (!this.$refs.form.validate()) return;

      const useObejct = {
        usedDate: this.usedDate,
        category: this.category,
        amount: +(this.amount),
        customer: this.customer,
        purpose: this.purpose,
        memo: this.memo || '',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        timeInMs: +Date.now(), // time stamp
      };

      this.registration(useObejct);
      this.initInputFields();
    },
    onClick(data) {
      console.log('onClick data: ', data);

      this.dialogData = [
        { name: '사용일시', values: data.usedDate },
        { name: '분류', values: data.category },
        { name: '고객사', values: data.customer },
        { name: '사용목적 또는 사유', values: data.purpose },
        { name: '사용금액', values: data.amount },
        { name: '기타메모', values: data.memo },
      ];
      this.dialog = true;
    },
    initModalUpdateTotal() {
      this.changeBalance = '';
      this.isUpdateTotalCheckbox.add = true;
      this.isUpdateTotalCheckbox.minus = false;
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
    updateTotalBalance(changeBalance) {
      if (changeBalance < this.rules.minValue) {
        alert(`최저 입력 금액 : ${this.rules.minValue}원`);
      } else if (changeBalance > this.rules.maxValue) {
        alert(`최대 입력 금액 : ${this.rules.maxValue}원`);
      } else {
        this.isUpdateTotalDialog = false;
        const index = Object.values(this.isUpdateTotalCheckbox).findIndex((item) => item === true);
        const balance = Number(changeBalance);
        this.updateLimitBalance({
          limitBalance: index === 0 ? this.limitBalance + balance : this.limitBalance - balance,
          balance: index === 0 ? this.totalBalanceAmount + balance : this.totalBalanceAmount - balance,
        });
      }
    },
    onButtonClick() {
      console.log('onButtonClick data: ', this.selected);
      this.snackbar = true;
    },
    onDelete() {
      this.snackbar = false;

      for (let i = 0; i < this.selected.length; i += 1) {
        const useObejct = {
          amount: utils.stringWithCommasToNumber(this.selected[i].amount, 0),
          timeInMs: this.selected[i].timeInMs,
        };
        this.deleteData(useObejct);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-footer-prepend {
  margin-top: -58px;
  height: 58px;
}
</style>
