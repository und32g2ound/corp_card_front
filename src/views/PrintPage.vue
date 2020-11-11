<template>
  <div class="page">
    <div class="subpage">
      <div class="line"></div>

      <div class="title">
        법인카드 사용 내역서
      </div>

      <div class="sign">
        <div class="leftBox">
          결<br><br>재
        </div>
        <div class="rightBox">
          <div
            v-for="(item, index) in signTitle"
            :key="index"
            class="inBox"
          >
            <div class="inBoxTitle">{{ item }}</div>
          </div>
        </div>
      </div>

      <div class="mainTitle">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="inBox"
          :style="{
            'width': `${item.width}mm`
          }"
        >{{ item.title }}</div>
      </div>

      <div
        v-for="(item, index) in tableData.slice(0, 4)"
        :key="index + '-div'"
        class="divideLine"
        :style="{
          'height': `${item.height}mm`,
          'left': `${item.left}mm`
        }"
      ></div>

      <!-- 테이블 데이터 세팅: 25개보다 적어도 빈값으로 25개 채워주세요. -->
      <div
        v-for="(tableItem, index) in printData"
        :key="index"
        class="mainTable"
      >
        <div
          v-for="(item, index) in tableItem"
          :key="index"
          class="inBox"
          :style="{
            'width': `${item.width}mm`,
          }"
        >{{ item.data }}</div>
      </div>

      <div class="amount">
        <div class="amountTitle">
          합 계
        </div>
        <div class="amountPrice">
          {{ totalAmount }}
        </div>
      </div>

      <div class="approver">
        작성자 : {{ approver }}
      </div>
    </div>

    <div class="bottom">㈜오픈오브젝트</div>
  </div>
</template>

<script>
import fireStore from '@/mixins/fireStore';
import utils from '@/utils/utils';
import { cloneDeep } from 'lodash';

// NOTE: yu-dw 확인 후 원래 사용한게 더 좋으면 다시 바꿔주세요
// lodash에 있는 cloneDeep이 완벽하게 별개 객체로 clone 해준다고 해서 씀
// const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

export default {
  name: 'PrintPage',
  mixins: [fireStore],
  data() {
    return {
      signTitle: [
        '담 당',
        '팀 장',
        '사업부장',
        '대표이사',
      ],
      tableData: [
        {
          title: '월일',
          data: '',
          width: '19',
          left: '18',
        },
        {
          title: '분류',
          data: '',
          width: '19',
          left: '37',
        },
        {
          title: '고객사',
          data: '',
          width: '25',
          left: '62',
        },
        {
          title: '사용목적 또는 사유(상세히)',
          data: '',
          width: '78',
          height: '183',
          left: '140',
        },
        {
          title: '금 액',
          data: '',
          width: '26',
        },
      ],
      printData: [],
      totalAmount: 0,
      approver: '',
      reversedHistoryList: [],
    };
  },
  created() {
    for (let i = 0; i < 25; i += 1) {
      const data = cloneDeep(this.tableData);
      this.printData.push(data);
    }

    // 메인 사용내역서는 최신순이고
    // 프린트용으로는 과거순으로 출력되야 하므로 역정렬 함
    this.reversedHistoryList = cloneDeep(this.historyList).sort((a, b) => a.timeInMs - b.timeInMs);

    for (let i = 0; i < this.reversedHistoryList.length; i += 1) {
      const history = this.reversedHistoryList[i];

      const data = cloneDeep(this.tableData);
      data[0].data = history.usedDate;
      data[1].data = history.category;
      data[2].data = history.customer;
      data[3].data = history.purpose;
      data[4].data = utils.numberWithCommas(history.amount);
      this.printData[i] = data;
    }
  },
};
</script>

<style lang="scss" scoped>
.body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.page {
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm 2cm 1cm 2cm;
  margin: 0 auto;
  background: #eee;
}

.subpage {
  position: relative;
  background: #fff;
  height: 257mm;
  // border: 0.7mm black solid;

  .line {
    position: absolute;
    width: 17cm;
    height: 257mm;
    border: 0.7mm black solid;
  }

  .title {
    padding: 5mm;
    font-size: 18.0pt;
    font-weight: 600;
    text-align: center;
  }

  .sign {
    float: right;
    width: 85mm;
    height: 27mm;
    text-align: center;
    border-top: 2px black solid;
    border-bottom: 2px black solid;
    border-left: 2px black solid;

    .leftBox {
      padding-top: 6mm;
      float: left;
      font-size:10.0pt;
      width: 8.2mm;
      height: 26mm;
      border-right: 1px black solid;
    }

    .rightBox {
      float: right;
      font-size:10.0pt;
      // width: 76.1mm;
      height: 26mm;
      display: flex;

      .inBox {
        width: 19.06mm;
        height: 26mm;
        border-right: 0.3mm black solid;
        &:last-child {
          border-right: none;
        }
      }

      .inBoxTitle {
        line-height: 9.5mm;
        width: 19mm;
        height: 9mm;
        border-bottom: 0.3mm black solid;
      }
    }
  }

  .mainTitle {
    display: flex;
    margin-top: 35mm;
    height: 9mm;
    text-align: center;
    border-top: 0.3mm black solid;
    border-bottom: 3px black double;
    background-color: #dcdcff;

    .inBox {
      line-height: 8mm;
      font-size:10.0pt;
      border-right: 0.3mm black solid;
      &:last-child {
        border-right: none;
      }
    }
  }

  .divideLine {
    position: absolute;
    width: 1mm;
    height: 175mm;
    border-right: 0.3mm black solid;
  }

  .mainTable {
    display: flex;
    height: 7mm;
    text-align: center;
    border-bottom: 0.1mm rgba(0, 0, 0, 0.35) solid;

    .inBox {
      line-height: 7.5mm;
      font-size:9.0pt;
    }
  }

  .amount {
    display: flex;
    height: 8mm;
    text-align: center;
    border-top: 0.6mm black solid;
    border-bottom: 0.7mm black solid;

    .amountTitle {
      width: 141mm;
      line-height: 7mm;
      font-size:10.0pt;
    }

    .amountPrice {
      width: 27mm;
      line-height: 7mm;
      font-size:10.0pt;
    }
  }

  .approver {
    height: 11mm;
    line-height: 12mm;
    font-size:10.0pt;
    text-align: center;
  }
}

.bottom {
  text-align: right;
  font-size:10.0pt;
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  html,
  body {
    width: 210mm;
    height: 297mm;
  }

  .page {
    margin: 0;
    border: initial;
    width: initial;
    min-height: initial;
    box-shadow: initial;
    background: initial;
    page-break-after: always;
  }
}
</style>
