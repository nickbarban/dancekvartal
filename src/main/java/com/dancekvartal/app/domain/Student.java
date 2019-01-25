package com.dancekvartal.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.util.CollectionUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.Comparator;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "birthday")
    private Instant birthday;

    @NotNull
    @Column(name = "personal_phone", nullable = false)
    private String personalPhone;

    @Column(name = "parent_phone")
    private String parentPhone;

    @Column(name = "email")
    private String email;

    @Column(name = "last_pay_date")
    private Instant lastPayDate;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Student firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Student lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Instant getBirthday() {
        return birthday;
    }

    public Student birthday(Instant birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(Instant birthday) {
        this.birthday = birthday;
    }

    public String getPersonalPhone() {
        return personalPhone;
    }

    public Student personalPhone(String personalPhone) {
        this.personalPhone = personalPhone;
        return this;
    }

    public void setPersonalPhone(String personalPhone) {
        this.personalPhone = personalPhone;
    }

    public String getParentPhone() {
        return parentPhone;
    }

    public Student parentPhone(String parentPhone) {
        this.parentPhone = parentPhone;
        return this;
    }

    public void setParentPhone(String parentPhone) {
        this.parentPhone = parentPhone;
    }

    public String getEmail() {
        return email;
    }

    public Student email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getLastPayDate() {
        return lastPayDate;
    }

    public Student lastPayDate(Instant lastPayDate) {
        this.lastPayDate = lastPayDate;
        return this;
    }

    public void setLastPayDate(Instant lastPayDate) {
        this.lastPayDate = lastPayDate;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Student payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Student addPayment(Payment payment) {
        this.payments.add(payment);
        payment.setStudent(this);
        this.lastPayDate = this.payments.stream().max(Comparator.comparing(Payment::getDate)).get().getDate();
        return this;
    }

    public Student removePayment(Payment payment) {
        this.payments.remove(payment);
        payment.setStudent(null);
        if (CollectionUtils.isEmpty(this.payments)) {
            this.lastPayDate = this.payments.stream().max(Comparator.comparing(Payment::getDate)).get().getDate();
        } else {
            this.lastPayDate = null;
        }
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", personalPhone='" + getPersonalPhone() + "'" +
            ", parentPhone='" + getParentPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", lastPayDate='" + getLastPayDate() + "'" +
            "}";
    }
}
