<template>
  <div class="popup"
    v-if="visible" @click.self="handleWrapperClick">
    <div class="popup__dialog">
      <header class="popup__header">
        <h5 class="header-title">Detail</h5>
      </header>
      <hr class="line" />
      <div class="popup__body">
        <table>
          <tbody>
            <tr>
              <td class="title">내역등록일시</td>
              <td class="contents">{{popupData.date}}</td>
            </tr>
            <tr>
              <td class="title">사용일시</td>
              <td v-if="isEdit === 0">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <i class="fas fa-check-circle edit-btn" @click="editData(0)" />
              </td>
              <td v-else>
                <span>{{popupData.usedDate || ''}}</span>
                <i class="far fa-edit edit-btn" @click="editMode(0)" />
              </td>
            </tr>
            <tr>
              <td class="title">사용 내역 분류</td>
              <td v-if="isEdit === 1">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <i class="fas fa-check-circle edit-btn" @click="editData(1)" />
              </td>
              <td v-else>
                <span class="contents">{{popupData.category || ''}}</span>
                <i class="far fa-edit edit-btn" @click="editMode(1)" />
              </td>
            </tr>
            <tr>
              <td class="title">고객사</td>
              <td v-if="isEdit === 2">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <i class="fas fa-check-circle edit-btn" @click="editData(2)" />
              </td>
              <td v-else>
                <span class="contents">{{popupData.customer || ''}}</span>
                <i class="far fa-edit edit-btn" @click="editMode(2)" />
              </td>
            </tr>
            <tr>
              <td class="title">사용 목적 또는 사유</td>
              <td v-if="isEdit === 3">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <i class="fas fa-check-circle edit-btn" @click="editData(3)" />
              </td>
              <td v-else>
                <span class="contents">{{popupData.purpose || ''}}</span>
                <i class="far fa-edit edit-btn" @click="editMode(3)" />
              </td>
            </tr>
            <tr>
              <td class="title">사용금액</td>
              <td v-if="isEdit === 4">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <i class="fas fa-check-circle edit-btn" @click="editData(4)" />
              </td>
              <td v-else>
                <span class="contents">{{utils.numberWithCommas(popupData.amount)}}</span>
                <i class="far fa-edit edit-btn" @click="editMode(4)" />
              </td>
            </tr>
            <tr>
              <td class="title">비고</td>
              <td v-if="isEdit === 5">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <i class="fas fa-check-circle edit-btn" @click="editData(5)" />
              </td>
              <td v-else>
                <span class="contents">{{popupData.memo}}</span>
                <i class="far fa-edit edit-btn" @click="editMode(5)" />
              </td>
            </tr>
            <tr>
              <td class="title">잔액</td>
              <td class="contents">{{utils.numberWithCommas(popupData.balance)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-area">
        <button class="footer-btn" @click="deleteUsage">삭제</button>
        <button class="footer-btn" @click="$emit('update:visible', !visible)">
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import utils from '@/utils/utils';
import corpStore from '@/mixins/corpStore';

export default {
  name: 'Popup',
  props: ['visible', 'popupData'],
  mixins: [corpStore],
  data() {
    return {
      editIndex: null,
      utils,
      inputText: '',
    };
  },
  watch: {
    popupData() {
      console.log('popupData:', this.popupData);
    },
    visible() {
      this.editIndex = null;
    },
  },
  computed: {
    isEdit() {
      return this.editIndex;
    },
  },
  methods: {
    editInputText(e) {
      this.inputText = e.target.value;
    },
    editData(index) {
      console.log('index: ', index);
      // index에 따른 데이터 수정 case 생성 예정
      const editColumn = {
        columnName: '',
        columnValue: '',
        timeInMs: '',
        changeBalance: 0,
      };

      switch (index) {
        case 0:
          editColumn.columnName = 'usedDate';
          break;
        case 1:
          editColumn.columnName = 'category';
          break;
        case 2:
          editColumn.columnName = 'customer';
          break;
        case 3:
          editColumn.columnName = 'purpose';
          break;
        case 4:
          editColumn.columnName = 'amount';
          break;
        case 5:
          editColumn.columnName = 'memo';
          break;
        default:
      }

      if (index === 4) {
        if (this.popupData.amount > Number(this.inputText)) {
          editColumn.changeBalance = this.popupData.amount - Number(this.inputText);
        } else if (this.popupData.amount === Number(this.inputText)) {
          editColumn.changeBalance = Number(this.inputText);
        } else {
          editColumn.changeBalance = this.popupData.amount - Number(this.inputText);
        }
        editColumn.columnValue = Number(this.inputText);
      } else {
        editColumn.columnValue = this.inputText;
      }

      editColumn.timeInMs = this.popupData.timeInMs;

      this.editColumn(editColumn);
    },
    editMode(index) {
      this.editIndex = index;
    },
    handleWrapperClick() {
      this.$emit('update:visible', false);
    },
    deleteUsage() {
      const useObejct = {
        amount: this.popupData.amount,
        timeInMs: this.popupData.timeInMs,
      };

      this.deleteData(useObejct);
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Arvo:700);
@import url(https://fonts.googleapis.com/css?family=Seaweed+Script);
$module: 'popup';

.#{$module} {
  // This is modal bg
  background-color: rgba(0,0,0,.7);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  //This is modal layer
  &__dialog{
    left: 50%;
    top: 75px;
    width: 600px;
    margin-left: -300px;
    position: absolute;
    background: #fff;
    margin-bottom: 50px;
  }

  &__header {
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
    margin: 0 auto;
  }
  &__body {
    padding: 25px;
    min-height: 150px;
    max-height: 412px;
  }
}

/* 상당 영역 */
.header-title {
  width: 120px;
  background-color: #0f9ad8;
  font-weight: bold;
  text-shadow:
    -3px -3px 0 #222,
    3px -3px 0 #222,
    -3px 3px 0 #222,
    3px 3px 0 #222;
  line-height: 0.8em;
  letter-spacing: 0.1em;
  transform: scaleY(0.7);
  -webkit-transform: scaleY(0.7);
  -moz-transform: scaleY(0.7);
  text-align: center;
  font-family: "Seaweed Script";
  color: #fff;
  font-size: 40px;
  position: relative;
  margin: auto;
}

.line {
  border: 1.5px solid #263343;
  opacity: 0.8;
}

/* table 영역 */
table {
  font-family: 'Source Sans Pro';
  border-collapse: collapse;
  width: 90%;
  margin: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: right;
  padding: 8px;
}

input {
  width: 100px;
}

.title {
  background-color: #f4f4f4;
  text-align: center;
  font-size: 15px;
}

.contents {
  width: 60%;
  font-size: 15px;
}

// 버튼 관련
.edit-btn {
  margin-left: 10px;
}

.btn-area {
  position: relative;
  height: 50px;
  margin-top: 5px;
  margin: 15px;
  text-align: center;
}

.footer-btn {
  width:90px;
  background-color: #263343;
  border: none;
  color:#fff;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  margin: 10px;
  cursor: pointer;
  border-radius:10px 0 10px 0;
}
</style>
