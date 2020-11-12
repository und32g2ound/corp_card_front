<template>
  <div class="popup"
    v-if="visible" @click.self="handleWrapperClick">
    <div class="popup__dialog">
      <header class="popup__header">
        <h5 class="title">사용내역 상세</h5>
      </header>
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
                <button class="edit-btn" @click="editData(0)">수정완료</button>
              </td>
              <td v-else>
                <span>{{popupData.usedDate || ''}}</span>
                <button class="edit-btn" @click="editMode(0)">수정</button>
              </td>
            </tr>
            <tr>
              <td class="title">사용 내역 분류</td>
              <td v-if="isEdit === 1">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <button class="edit-btn" @click="editData(1)">수정완료</button>
              </td>
              <td v-else>
                <span>{{popupData.category || ''}}</span>
                <button class="edit-btn" @click="editMode(1)">수정</button>
              </td>
            </tr>
            <tr>
              <td class="title">고객사</td>
              <td v-if="isEdit === 2">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <button class="edit-btn" @click="editData(2)">수정완료</button>
              </td>
              <td v-else>
                <span>{{popupData.customer || ''}}</span>
                <button class="edit-btn" @click="editMode(2)">수정</button>
              </td>
            </tr>
            <tr>
              <td class="title">사용 목적 또는 사유</td>
              <td v-if="isEdit === 3">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <button class="edit-btn" @click="editData(3)">수정완료</button>
              </td>
              <td v-else>
                <span>{{popupData.purpose || ''}}</span>
                <button class="edit-btn" @click="editMode(3)">수정</button>
              </td>
            </tr>
            <tr>
              <td class="title">사용금액</td>
              <td v-if="isEdit === 4">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <button class="edit-btn" @click="editData(4)">수정완료</button>
              </td>
              <td v-else>
                <span>{{utils.numberWithCommas(popupData.amount)}}</span>
                <button class="edit-btn" @click="editMode(4)">수정</button>
              </td>
            </tr>
            <tr>
              <td class="title">비고</td>
              <td v-if="isEdit === 5">
                <span>
                  <input class="" @input="editInputText($event)">
                </span>
                <button class="edit-btn" @click="editData(5)">수정완료</button>
              </td>
              <td v-else>
                <span>{{popupData.memo}}</span>
                <button class="edit-btn" @click="editMode(5)">수정</button>
              </td>
            </tr>
            <tr>
              <td class="title">잔액</td>
              <td>{{utils.numberWithCommas(popupData.balance)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-area">
        <button class="footer-btn" @click="deleteUsage">삭제</button>
        <button class="footer-btn" @click="$emit('update:visible', !visible)">닫기</button>
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

      editColumn.columnValue = this.inputText;
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

table {
  font-family: 'Source Sans Pro';
  border-collapse: collapse;
  width: 90%;
  margin: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

input {
  width: 100px;
}

.title {
  text-align: center;
  font-weight: bold;
}
.btn-area {
  position: relative;
  height: 50px;
  margin: 10px;
  text-align: center;
}

.footer-btn {
  width: 50px;
  margin: 10px;
  font-size: 1em;
  font-weight: bold;
}
.edit-btn {
  margin-left: 10px;
}

.contents {
  width: 60%;
}

</style>
