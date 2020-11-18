<template>
  <v-container>
    <v-row
      class="px-2 py-3"
    >
      <v-col
        cols=7
      >
        <!-- 사용내역 타이틀 -->
        <v-card-title class="justify-center">
          법인카드 사용내역서
        </v-card-title>

        <!-- 구분선 -->
        <v-divider class="mx-4"></v-divider>

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
        >
          <template v-slot:top>
            <v-switch
              v-model="multiSelect"
              label="다중 선택 활성화"
              class="pa-3"
            ></v-switch>
          </template>
        </v-data-table>
      </v-col>

      <!-- 구분선 -->
      <v-col
        cols=1>
        <v-divider vertical class="pl-10"></v-divider>
      </v-col>

      <!-- 사용내역 입력란 -->
      <v-col
        cols=4
      >
        <v-card>
          <v-card-title>Summary</v-card-title>
          <v-card-text>사용 총합계 : {{ getTotalUsedAmount }}원</v-card-text>
          <v-card-text>잔액: {{ getTotalBalanceAmount }}원</v-card-text>
        </v-card>
        <v-card>
          <v-card-title>
            <h5 class="display-5">사용내역 입력</h5>
          </v-card-title>
          <v-card-text>
            <v-form>
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
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(usedDate)"
                  >
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
              ></v-autocomplete>

              <v-text-field
                label="고객사"
                prepend-icon="mdi-target"
                v-model="customer"
              />
              <v-text-field
                label="사용목적 또는 사유(상세히)"
                prepend-icon="mdi-note-text-outline"
                v-model="purpose"
              />
              <v-text-field
                label="사용금액"
                prepend-icon="mdi-currency-krw"
                v-model="amount"
              />
              <v-text-field
                label="기타(메모)"
                prepend-icon="mdi-note-plus-outline"
                v-model="memo"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="success"
              @click="register"
            >Register
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color="info"
              @click="initInputFields"
            >Reset
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- 분류별 합계 테이블 -->
    <v-row
      class="px-2 py-3"
    >
      <v-col
        cols="7">
        <v-card>
          <v-card-title>
            <h5 class="display-5">분류별 합계</h5>
          </v-card-title>
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
  }),
  created() {
    this.initialize();
  },
  mounted() {
    this.getHistory();
  },
  computed: {
    isLoading() {
      return this.historyList.length <= 0;
    },
    getTotalBalanceAmount() {
      return utils.numberWithCommas(this.totalBalanceAmount);
    },
    getTotalUsedAmount() {
      // eslint-disable-next-line max-len
      return utils.numberWithCommas(this.historyList.reduce((accumulator, item) => accumulator + utils.stringWithCommasToNumber(item.amount), 0));
    },
    getCategorySumList() {
      const result = this.categoryList.map((category) => {
        const filterdList = this.historyList.filter((i) => i.category === category);

        let list = [];
        if (filterdList) {
          // eslint-disable-next-line max-len
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
      this.amount = '';
      this.memo = '';
    },
    register() {
      const useObejct = {
        usedDate: this.usedDate,
        category: this.category,
        amount: +this.amount,
        customer: this.customer,
        purpose: this.purpose,
        memo: this.memo || '',
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        timeInMs: +Date.now(), // time stamp
      };

      this.registration(useObejct);
      this.initInputFields();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
